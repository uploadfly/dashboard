import {
  ACMClient,
  RequestCertificateCommand,
  RequestCertificateCommandOutput,
} from "@aws-sdk/client-acm";
import { NextResponse } from "next/server";
import validator from "validator";

export async function POST(request: Request) {
  const { domainName } = (await request.json()) as { domainName: string };

  if (!domainName)
    return NextResponse.json(
      { message: "Domain name is required" },
      { status: 400 }
    );

  if (!validator.isURL(domainName))
    return NextResponse.json(
      { message: "Invalid domain name" },
      { status: 400 }
    );

  if (domainName.includes("/"))
    return NextResponse.json(
      {
        message: "Domain name should not cotain any paths.",
      },
      { status: 400 }
    );

  if (domainName.startsWith("http"))
    return NextResponse.json(
      {
        message: "Domain name should not include protocol.",
      },
      { status: 400 }
    );

  if (domainName.startsWith("www."))
    return NextResponse.json(
      {
        message: "Domain name should not include 'www.' prefix.",
      },
      { status: 400 }
    );

  try {
    const client = new ACMClient({ region: "REGION" });

    const command = new RequestCertificateCommand({
      DomainName: "",
      ValidationMethod: "DNS",
    });

    const data: RequestCertificateCommandOutput = await client.send(command);
  } catch (error) {}
}
