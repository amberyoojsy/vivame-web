import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const mainPath = path.join(__dirname, "..", "js", "main.js");
let src = fs.readFileSync(mainPath, "utf8");

const startMarker = "var CLUB_PORTAL_CLUBS = [";
const i0 = src.indexOf(startMarker);
const endReal = src.indexOf("\n];\n\nfunction escapeHtmlText", i0);
if (endReal < 0) {
  console.error("end marker not found");
  process.exit(1);
}

const snippet = src.slice(i0, endReal + 3);
const clubs = new Function(snippet + "\nreturn CLUB_PORTAL_CLUBS;")();

const order = [
  "그립(Grip) (운동/퍼포먼스)",
  "포시즌스 (시즌 액티비티/친목)",
  "비상턴 (운동/활동)",
  "모종의 시작 (도시농부/가드닝)",
  "그림책 놀이터 (힐링/독서)",
  "퐁당다이브클럽 (수영/다이빙)",
  "팝케팅 (트렌드/팝업스토어 탐방)",
  "Focus on (사진/출사)",
  "원모어 (One More) (운동/자기관리)",
  "비상다독 (독서/자기계발)",
  "다람지 (다양한 스포츠 관람)",
  "비상골린이들 (골프/친목)",
  "온니 플라워 (플라워/힐링)",
  "떼구르 (볼링/친목)",
  "AVOCADO (맛집 탐방 & 콘솔 게임)",
];

const byName = Object.fromEntries(clubs.map((c) => [c.name, c]));
const missing = order.filter((n) => !byName[n]);
if (missing.length) {
  console.error("Missing names:", missing);
  process.exit(1);
}

const reordered = order.map((n) => byName[n]);

function fmt(obj) {
  const esc = JSON.stringify;
  const d = obj.detail;
  const detailLit =
    "`" +
    String(d).replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${") +
    "`";
  return [
    "  {",
    "    name: " + esc(obj.name) + ",",
    "    tagline: " + esc(obj.tagline) + ",",
    "    summary:",
    "      " + esc(obj.summary) + ",",
    "    detail: " + detailLit + ",",
    "    leaderInfo: " + esc(obj.leaderInfo) + ",",
    "    email: " + esc(obj.email) + ",",
    "    image: " + esc(obj.image) + ",",
    "    badge: " + esc(obj.badge) + ",",
    "  }",
  ].join("\n");
}

const body = reordered.map(fmt).join(",\n");
const out =
  src.slice(0, i0) + "var CLUB_PORTAL_CLUBS = [\n" + body + "\n];" + src.slice(endReal + 3);

fs.writeFileSync(mainPath, out);
console.log("OK", reordered.length, "clubs reordered");
