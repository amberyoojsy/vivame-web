/**
 * VIVAME 랜딩 페이지 메인 스크립트
 * - 사이트 탭(비바미 / 사내 동호회) 전환
 * - 부드러운 스크롤 (고정 헤더 오프셋)
 * - 후기 캐러셀 네비게이션
 * - 사내 동호회 카드 및 모달
 */

function getNavOffset() {
  var nav = document.querySelector("nav");
  return nav ? nav.offsetHeight : 0;
}

function scrollToSection(id) {
  var element = document.getElementById(id);
  if (!element) return;
  var y = element.getBoundingClientRect().top + window.scrollY - getNavOffset();
  window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
}

/** @typedef {{ name: string, tagline: string, detail: string, email: string, image: string, badge?: string }} ClubPortalItem */

/** @type {ClubPortalItem[]} */
var CLUB_PORTAL_CLUBS = [
  {
    name: "비상 러닝 크루",
    tagline: "아침을 깨우는 러닝, 함께라서 더 즐겁습니다.",
    badge: "운동",
    detail:
      "주 1~2회 아침 러닝으로 하루를 시작하는 동호회입니다. 난이도는 페이스에 맞춰 조절하며, 러닝 후 가벼운 스트레칭과 커피 타임으로 동료들과 소통합니다.\n\n신입도 환영이며, 운동화만 챙기시면 됩니다.",
    email: "vivame.clubs.running@visang.com",
    image: "./assets/belief-test.png",
  },
  {
    name: "북클럽 '날개짓'",
    tagline: "책 한 권이 만드는 작은 대화의 날개.",
    badge: "문화",
    detail:
      "월 1회 선정 도서를 읽고 모여 이야기를 나눕니다. 업무 서적뿐 아니라 에세이·소설 등 다양한 장르를 오가며, 각자의 관점을 존중하는 토론 문화를 지향합니다.\n\n다음 모임 도서와 일정은 팀즈 공지로 안내드립니다.",
    email: "vivame.clubs.book@visang.com",
    image: "./assets/writing-room.png",
  },
  {
    name: "필름 · 사진 소모임",
    tagline: "일상의 순간을 프레임에 담아 나눕니다.",
    badge: "취미",
    detail:
      "필름·디지털 가리지 않고 촬영과 현상(또는 보정) 경험을 공유합니다. 분기별로 소규모 전시나 촬영 워크숍을 기획하기도 합니다.\n\n장비 유무와 관계없이 관심만 있으시면 환영입니다.",
    email: "vivame.clubs.photo@visang.com",
    image: "./assets/film-festival.png",
  },
  {
    name: "업사이클·환경 모임",
    tagline: "작은 실천이 만드는 순환의 시작.",
    badge: "ESG",
    detail:
      "사내 자원 순환 캠페인과 연계해 병뚜껑·종이 등을 활용한 업사이클 작품을 함께 만듭니다. 환경 이슈를 가볍게 나누고 실천 아이디어를 모읍니다.\n\n새로운 재료 아이디어를 가져오셔도 좋습니다.",
    email: "vivame.clubs.eco@visang.com",
    image: "./assets/bottle-cap.png",
  },
  {
    name: "간식 & 푸드 클럽",
    tagline: "맛있는 한 입이 모이는 자리.",
    badge: "푸드",
    detail:
      "계절 간식·시즌 메뉴를 함께 나누고, 가끔은 직접 만든 메뉴로 소소한 맛집 투어를 즐깁니다. 알레르기·채식 등은 사전에 공유해 주세요.\n\n부담 없이 참여 가능한 가벼운 모임입니다.",
    email: "vivame.clubs.food@visang.com",
    image: "./assets/snack-attack.png",
  },
  {
    name: "집씨통 가드너스",
    tagline: "책상 위 작은 숲, 함께 키워요.",
    badge: "취미",
    detail:
      "반려 식물과 씨앗 키우기를 사랑하는 구성원이 모여 경험을 나눕니다. 물주기 체크·성장 기록 등을 함께하며 과천 숲 프로젝트와 연계된 이야기도 나눕니다.\n\n초보 환영, 화분 하나만 있어도 OK입니다.",
    email: "vivame.clubs.green@visang.com",
    image: "./assets/jipssitong.png",
  },
  {
    name: "과천 라이프스타일",
    tagline: "새 사옥과 동네를 함께 즐겨요.",
    badge: "라이프",
    detail:
      "과천 근교 산책·카페·문화 행사 정보를 공유하고, 동호회 산책 코스를 함께 개척합니다. 에티켓과 배려를 바탕으로 쾌적한 일터 문화를 응원합니다.\n\n가볍게 동네 탐방을 즐기고 싶은 분께 추천합니다.",
    email: "vivame.clubs.local@visang.com",
    image: "./assets/gwacheon-etiquette.png",
  },
  {
    name: "우리의 믿음 북토크",
    tagline: "비상의 가치를 이야기로 잇습니다.",
    badge: "문화",
    detail:
      "핵심 가치 '우리의 믿음'을 주제로 한 독서·토론 모임입니다. 실무 사례와 개인의 경험을 연결하며 조직문화에 대한 통찰을 나눕니다.\n\n발제자·청중 모두 자유롭게 참여할 수 있습니다.",
    email: "vivame.clubs.belief@visang.com",
    image: "./assets/fake-docu.png",
  },
  {
    name: "테이블 토크 네트워크",
    tagline: "한 테이블에서 시작하는 아이디어와 응원.",
    badge: "네트워킹",
    detail:
      "부서·직무를 넘어 원탁 대화를 나누는 소규모 모임입니다. 라이트닝 토크와 자유 질의응답으로 서로의 프로젝트를 소개하고 협업의 씨앗을 찾습니다.\n\n분기별로 주제를 정해 공지합니다.",
    email: "vivame.clubs.network@visang.com",
    image: "./assets/quiz-cta-bg.png",
  },
];

function clubInitials(name) {
  var trimmed = name.replace(/\s+/g, " ").trim();
  var parts = trimmed.split(" ").filter(Boolean);
  if (parts.length >= 2) {
    var a = parts[0].charAt(0);
    var b = parts[1].charAt(0);
    return (a + b).toUpperCase();
  }
  return trimmed.slice(0, 2).toUpperCase();
}

function buildTeamsChatUrl(email) {
  return "https://teams.microsoft.com/l/chat/0/0?users=" + encodeURIComponent(email);
}

function buildMailtoUrl(email) {
  var subject = encodeURIComponent("[비상 동호회] 문의드립니다");
  return "mailto:" + email + "?subject=" + subject;
}

function openClubModal(/** @type {ClubPortalItem} */ club) {
  var modal = document.getElementById("clubModal");
  if (!modal) return;

  var titleEl = document.getElementById("clubModalTitle");
  var taglineEl = document.getElementById("clubModalTagline");
  var detailEl = document.getElementById("clubModalDetail");
  var imgEl = document.getElementById("clubModalImage");
  var initialsEl = document.getElementById("clubModalInitials");
  var mailEl = document.getElementById("clubModalMailto");
  var teamsEl = document.getElementById("clubModalTeams");

  if (titleEl) titleEl.textContent = club.name;
  if (taglineEl) taglineEl.textContent = club.tagline;
  if (detailEl) detailEl.textContent = club.detail;

  if (imgEl && initialsEl) {
    imgEl.classList.add("hidden");
    initialsEl.textContent = clubInitials(club.name);
    imgEl.alt = club.name;
    imgEl.onload = function () {
      imgEl.classList.remove("hidden");
      initialsEl.textContent = "";
    };
    imgEl.onerror = function () {
      imgEl.classList.add("hidden");
      initialsEl.textContent = clubInitials(club.name);
    };
    imgEl.src = club.image;
    if (imgEl.complete && imgEl.naturalWidth > 0) {
      imgEl.classList.remove("hidden");
      initialsEl.textContent = "";
    }
  }

  if (mailEl) mailEl.href = buildMailtoUrl(club.email);
  if (teamsEl) teamsEl.href = buildTeamsChatUrl(club.email);

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
  document.addEventListener("keydown", handleClubEscape);
}

function closeClubModal() {
  var modal = document.getElementById("clubModal");
  if (!modal) return;
  modal.classList.add("hidden");
  document.body.style.overflow = "";
  document.removeEventListener("keydown", handleClubEscape);
}

function handleClubEscape(e) {
  if (e.key === "Escape") closeClubModal();
}

function renderClubCards() {
  var root = document.getElementById("clubCardsRoot");
  if (!root) return;

  root.innerHTML = CLUB_PORTAL_CLUBS.map(function (club, idx) {
    var safeName = club.name.replace(/"/g, "&quot;");
    var safeImg = club.image.replace(/"/g, "&quot;");
    var badge = club.badge || "동호회";
    return (
      '<div class="group hover:-translate-y-2 transition-all duration-300">' +
      '<button type="button" class="club-portal-card w-full h-full text-left bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-[#00B5E2] hover:shadow-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5E2] focus-visible:ring-offset-2" data-club-index="' +
      idx +
      '" aria-label="' +
      safeName +
      " 상세 보기" +
      '">' +
      '<div class="relative h-40 sm:h-48 overflow-hidden bg-gradient-to-br from-[#00B5E2]/10 to-blue-50">' +
      '<img src="' +
      safeImg +
      '" alt="' +
      safeName +
      '" class="club-card-thumb w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500" loading="lazy" />' +
      '<div class="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent pointer-events-none"></div>' +
      '<div class="absolute bottom-4 left-4">' +
      '<span class="px-3 py-1 bg-[#00B5E2]/90 text-white text-xs font-medium rounded-full">' +
      badge +
      "</span></div>" +
      "</div>" +
      '<div class="p-4 sm:p-6">' +
      '<h3 class="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2">' +
      club.name +
      "</h3>" +
      '<p class="text-sm text-[#00B5E2] font-medium leading-snug">' +
      club.tagline +
      "</p>" +
      "</div>" +
      "</button>" +
      "</div>"
    );
  }).join("");

  root.querySelectorAll(".club-portal-card").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var i = parseInt(btn.getAttribute("data-club-index") || "0", 10);
      var club = CLUB_PORTAL_CLUBS[i];
      if (club) openClubModal(club);
    });
  });
}

function initClubPortal() {
  renderClubCards();

  var modal = document.getElementById("clubModal");
  if (!modal) return;

  var backdrop = document.getElementById("clubModalBackdrop");
  var closeBtn = document.getElementById("clubModalClose");
  var content = document.getElementById("clubModalContent");

  if (backdrop) {
    backdrop.addEventListener("click", closeClubModal);
  }
  if (closeBtn) {
    closeBtn.addEventListener("click", closeClubModal);
  }
  if (content) {
    content.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  }
}

/**
 * @param {'vivame' | 'clubs'} name
 * @param {{ skipHash?: boolean }} [opts]
 */
function setSiteTab(name, opts) {
  opts = opts || {};
  var vivamePanel = document.getElementById("tab-panel-vivame");
  var clubsPanel = document.getElementById("tab-panel-clubs");
  var quickNav = document.getElementById("vivameQuickNav");
  if (!vivamePanel || !clubsPanel) return;

  var isVivame = name === "vivame";

  if (isVivame) {
    vivamePanel.classList.remove("hidden");
    vivamePanel.removeAttribute("hidden");
    clubsPanel.classList.add("hidden");
    clubsPanel.setAttribute("hidden", "");
  } else {
    clubsPanel.classList.remove("hidden");
    clubsPanel.removeAttribute("hidden");
    vivamePanel.classList.add("hidden");
    vivamePanel.setAttribute("hidden", "");
  }

  if (quickNav) {
    if (isVivame) quickNav.classList.remove("hidden");
    else quickNav.classList.add("hidden");
  }

  document.querySelectorAll("[data-site-tab]").forEach(function (btn) {
    var tab = btn.getAttribute("data-site-tab");
    var active = (tab === "vivame" && isVivame) || (tab === "clubs" && !isVivame);
    btn.setAttribute("aria-selected", active ? "true" : "false");
    btn.classList.toggle("site-tab--active", active);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });

  if (!opts.skipHash && window.history && window.history.replaceState) {
    var hash = isVivame ? "#vivame" : "#clubs";
    if (window.location.hash !== hash) {
      window.history.replaceState(null, "", hash);
    }
  }

  try {
    vivamePanel.style.pointerEvents = isVivame ? "" : "none";
    clubsPanel.style.pointerEvents = isVivame ? "none" : "";
  } catch (e) {
    /* noop */
  }
}

function initSiteTabs() {
  document.querySelectorAll("[data-site-tab]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var tab = btn.getAttribute("data-site-tab");
      if (tab === "vivame" || tab === "clubs") setSiteTab(tab);
    });
  });

  window.addEventListener("hashchange", function () {
    var h = (window.location.hash || "").replace(/^#/, "");
    if (h === "clubs") setSiteTab("clubs", { skipHash: true });
    else setSiteTab("vivame", { skipHash: true });
  });

  var initial = (window.location.hash || "").replace(/^#/, "") === "clubs" ? "clubs" : "vivame";
  setSiteTab(initial, { skipHash: true });
}

document.addEventListener("DOMContentLoaded", function () {
  initSiteTabs();
  initClubPortal();

  var el = document.getElementById("testimonialScroll");
  var prev = document.querySelector(".testimonial-nav-prev");
  var next = document.querySelector(".testimonial-nav-next");
  if (!el || !prev || !next) return;

  function getScrollAmount() {
    var first = el.querySelector("article");
    var gap = 24;
    if (first) {
      var rect = first.getBoundingClientRect();
      return rect.width + gap;
    }
    return 304;
  }

  function updateButtons() {
    var maxScroll = el.scrollWidth - el.clientWidth;
    prev.style.opacity = el.scrollLeft <= 0 ? "0.4" : "1";
    prev.style.pointerEvents = el.scrollLeft <= 0 ? "none" : "auto";
    next.style.opacity = el.scrollLeft >= maxScroll - 1 ? "0.4" : "1";
    next.style.pointerEvents = el.scrollLeft >= maxScroll - 1 ? "none" : "auto";
  }

  prev.addEventListener("click", function () {
    el.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
  });
  next.addEventListener("click", function () {
    el.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
  });

  el.addEventListener("scroll", updateButtons);
  window.addEventListener("resize", updateButtons);
  updateButtons();
});
