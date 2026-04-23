import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

interface RawPayload {
  timeline?: Array<{ title: string; description: string }>;
}

async function run(): Promise<void> {
  const rawFile = path.resolve("data", "raw", "eci-export.json");
  const targetFile = path.resolve("data", "seed", "india-election-process.json");

  const rawContent = await readFile(rawFile, "utf8");
  const raw = JSON.parse(rawContent) as RawPayload;

  const normalizedTimeline = (raw.timeline ?? []).map((item, index) => ({
    id: `step-${index + 1}`,
    title: item.title,
    description: item.description,
    sourceId: "eci-main"
  }));

  const normalized = {
    jurisdiction: "India",
    lastVerified: new Date().toISOString().slice(0, 10),
    sources: [
      {
        id: "eci-main",
        name: "Election Commission of India",
        url: "https://eci.gov.in"
      }
    ],
    timeline: normalizedTimeline
  };

  await writeFile(targetFile, JSON.stringify(normalized, null, 2), "utf8");
  console.log(`Normalized content written to ${targetFile}`);
}

run().catch((error: unknown) => {
  console.error("Ingestion failed", error);
  process.exitCode = 1;
});
