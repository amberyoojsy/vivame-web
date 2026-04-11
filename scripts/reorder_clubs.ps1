$path = "c:\Users\user\OneDrive\Documents\GitHub\vivame-web\js\main.js"
$s = [System.IO.File]::ReadAllText($path)
$marker = "var CLUB_PORTAL_CLUBS = ["
$tail = "`r`n];`r`n`r`nfunction escapeHtmlText"
$i0 = $s.IndexOf($marker)
if ($i0 -lt 0) { throw "marker" }
$i1 = $s.IndexOf($tail, $i0)
if ($i1 -lt 0) { throw "tail" }
$inner = $s.Substring($i0 + $marker.Length, $i1 - ($i0 + $marker.Length))
$sep = "`r`n  },`r`n  {"
$parts = $inner.Split([string[]]@($sep), [System.StringSplitOptions]::None)
if ($parts.Count -ne 15) { throw "expected 15 got $($parts.Count)" }
$blocks = @()
for ($i = 0; $i -lt 15; $i++) {
  if ($i -lt 14) { $blocks += $parts[$i] + $sep }
  else { $blocks += $parts[$i] }
}
$byName = @{}
foreach ($b in $blocks) {
  if ($b -match 'name:\s*"([^"]+)"') {
    $byName[$matches[1]] = $b
  } else { throw "no name" }
}
$order = @(
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
  "AVOCADO (맛집 탐방 & 콘솔 게임)"
)
$newInner = ""
foreach ($n in $order) {
  if (-not $byName.ContainsKey($n)) { throw "missing $n" }
  $newInner += $byName[$n]
}
$head = $s.Substring(0, $i0 + $marker.Length)
$rest = $s.Substring($i1)
$newS = $head + $newInner + $rest
[System.IO.File]::WriteAllText($path, $newS, [System.Text.UTF8Encoding]::new($false))
Write-Host "OK"
