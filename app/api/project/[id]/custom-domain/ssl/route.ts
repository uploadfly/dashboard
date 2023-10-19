import { awsCredentials } from "@/lib/configs/aws";
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

  if (domainName.startsWith("http:") || domainName.startsWith("https:"))
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
    const command = new RequestCertificateCommand({
      DomainName: domainName,
      ValidationMethod: "DNS",
    });

    const data: RequestCertificateCommandOutput = await client.send(command);
    data;
    return NextResponse.json({ message: "Added", data });
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const cert_arn = searchParams.get("cert_arn")!;

    const command = new DescribeCertificateCommand({
      CertificateArn: cert_arn,
    });

    const response: DescribeCertificateCommandOutput = await client.send(
      command
    );

    const getParts = (string: string) => {
      return `${string.split(".")[0]}.${string.split(".")[1]}`;
    };

    const data = {
      domainName: response.Certificate?.DomainName,
      cert_arn,
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
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
