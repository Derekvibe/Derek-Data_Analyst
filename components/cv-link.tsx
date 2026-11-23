import { existsSync } from "node:fs";
import path from "node:path";

export function CvLink({ className = "" }: { className?: string }) {
  const hasCv = existsSync(path.join(process.cwd(), "public", "emmanuel-nzube-cv.pdf"));
  return hasCv ? (
    <a className={className} href="/emmanuel-nzube-cv.pdf" download>Download CV</a>
  ) : null;
}
