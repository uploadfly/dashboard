import prisma from "@/prisma";
import { deleteAllFiles } from "@/utils/deleteAllFiles";
import dayjs from "dayjs";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
  const body = await request.json();

  const event = body.meta.event_name as
    | "subscription_created"
    | "subscription_paused"
    | "subscription_unpaused"
    | "subscription_resumed"
    | "subscription_cancelled"
    | "subscription_expired"
    | "subscription_updated";
  const signature = request.headers.get("x-signature");

  if (!signature) {
    return NextResponse.json(
      { message: "No signature found" },
      { status: 401 }
    );
  }
  // const data = await request.text();
  // const secret = process.env.LEMON_SECRET;

  // const digest = crypto
  //   .createHmac("sha256", secret!)
  //   .update(data)
  //   .digest("base64");

  // if (digest !== signature) {
  //   console.log({
  //     digest,
  //     signature,
  //   });
  //   return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
  // }

  const customerId = String(body.data.attributes.customer_id);
  const userId = body.meta.custom_data.user_id;
  const projectId = body.meta.custom_data.project_id;

  try {
    const project = await prisma.fly.findUnique({
      where: {
        id: projectId,
      },
    });

    if (!project) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    if (event === "subscription_created") {
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          lemon_customer_id: customerId,
        },
      });

      await prisma.fly.update({
        where: {
          id: project?.id,
        },
        data: {
          plan: "pro",
          storage: 100000000000,
          lemon_subcription_id: String(body.data.id),
          lemon_subcription_created_at: new Date(
            body.data.attributes.created_at
          ),
          lemon_subcription_renews_at: new Date(body.data.attributes.renews_at),
        },
      });

      return NextResponse.json(
        { message: "Subscription created" },
        {
          status: 200,
        }
      );
    }

    if (event === "subscription_updated") {
      await prisma.fly.update({
        where: {
          id: projectId,
        },
        data: {
          lemon_subcription_renews_at: new Date(body.data.attributes.renews_at),
        },
      });
      return NextResponse.json(
        { message: "Subscription updated" },
        {
          status: 200,
        }
      );
    }

    if (event === "subscription_paused") {
      await prisma.fly.update({
        where: {
          id: projectId,
        },
        data: {
          paused: true,
          paused_at: dayjs().toDate(),
        },
      });
      return NextResponse.json(
        { message: "Subscription has been paused" },
        {
          status: 200,
        }
      );
    }

    if (event === "subscription_unpaused") {
      await prisma.fly.update({
        where: {
          id: projectId,
        },
        data: {
          paused: false,
          paused_at: null,
        },
      });
      return NextResponse.json(
        { message: "Subscription has been resumed" },
        {
          status: 200,
        }
      );
    }

    if (event === "subscription_expired") {
      await deleteAllFiles({
        projectId,
        userId,
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error", error },
      {
        status: 500,
      }
    );
  }
}
