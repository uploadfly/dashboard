import {
  ACMClient,
  RequestCertificateCommand,
  RequestCertificateCommandOutput,
} from "@aws-sdk/client-acm";

export async function POST(request: Request) {
  try {
    const client = new ACMClient({ region: "REGION" });

    const command = new RequestCertificateCommand({
      DomainName: "",
      ValidationMethod: "DNS",
    });

    const data: RequestCertificateCommandOutput = await client.send(command);
  } catch (error) {}
}
