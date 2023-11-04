import { awsCredentials } from "@/lib/configs/aws";
import prisma from "@/prisma";
import { getProject } from "@/utils/getProject";
import {
  ACMClient,
  DescribeCertificateCommand,
  DescribeCertificateCommandOutput,
  RequestCertificateCommand,
  RequestCertificateCommandOutput,
} from "@aws-sdk/client-acm";
import { NextResponse } from "next/server";
import validator from "validator";

const client = new ACMClient(awsCredentials);

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const project = await getProject(params.id);
  const { domainName } = (await request.json()) as { domainName: string };
  const domainNameExists = await prisma.customDomain.findUnique({
    where: { domain: domainName },
  });

  if (domainNameExists)
    return NextResponse.json(
      { message: "An existing project already uses this domain name." },
      { status: 400 }
    );

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

  if (domainName.startsWith("http:") || domainName.startsWith("https:"))
    return NextResponse.json(
      {
        message: "Domain name should not include protocol.",
      },
      { status: 400 }
    );

  if (domainName.includes("/"))
    return NextResponse.json(
      {
        message: "Domain name should not cotain any paths.",
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
    const command = new RequestCertificateCommand({
      DomainName: domainName,
      ValidationMethod: "DNS",
    });

    const data: RequestCertificateCommandOutput = await client.send(command);
    data;

    const customDomain = await prisma.customDomain.create({
      data: {
        domain: domainName,
        certificateArn: data.CertificateArn!,
        fly_id: project?.id!,
      },
    });

    return NextResponse.json({ message: "Added", customDomain });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const project = await prisma.customDomain.findUnique({
      where: { fly_id: params.id },
    });

    if (!project)
      return NextResponse.json(
        { message: "Project does not have a custom domain" },
        { status: 404 }
      );

    const command = new DescribeCertificateCommand({
      CertificateArn: project?.certificateArn,
    });

    const response: DescribeCertificateCommandOutput = await client.send(
      command
    );

    const getParts = (string: string) => {
      return `${string.split(".")[0]}.${string.split(".")[1]}`;
    };

    const data = {
      domainName: response.Certificate?.DomainName,
      cert_arn: project?.certificateArn,
      DNS: {
        validation_status:
          response.Certificate?.DomainValidationOptions?.[0]?.ValidationStatus,
        type: response.Certificate?.DomainValidationOptions?.[0]?.ResourceRecord
          ?.Type,
        name: getParts(
          response.Certificate?.DomainValidationOptions?.[0]?.ResourceRecord
            ?.Name!
        ),
        value:
          response.Certificate?.DomainValidationOptions?.[0]?.ResourceRecord
            ?.Value,
      },
    };
    return NextResponse.json({ ...data }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
