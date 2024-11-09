// The almost autosolver for https://neal.fun/password-game/
// copy the code into your browsers console
// current time might be an issue conflicting with rule 5

const { max, min } = Math;
const delay = 500;
const levels = [];

levels[0] = ["hi"];

// Your password must be at least 5 characters.
levels[1] = ["hello"];

// … include a number.
levels[2] = ["hell0"];

// … include an uppercase letter.
levels[3] = ["Hell0"];

// … include a special character.
levels[4] = ["H€ll0"];

// The digits in your password must add up to 25.
levels[5] = ["H€ll", sum25];

// Your password must include a month of the year.
levels[6] = ["H€may", sum25];

// … include a roman numeral.
levels[7] = ["I€may", sum25];

// … include one of our sponsors: …
levels[8] = ["I€mayshell", sum25];

// The roman numerals in your password should multiply to 35.
levels[9] = ["I€XXXVmayshell", sum25];

// Your password must include this CAPTCHA...
levels[10] = ["I€XXXVmayshell", captcha, sum25];

// … include today's Wordle answer.
levels[11] = ["I€XXXVmayshell", captcha, wordle, sum25];

// … include a two letter symbol from the periodic table.
levels[12] = ["ImayXXXVshellBe€", captcha, wordle, sum25];

// … include the current phase of the moon as an emoji.
levels[13] = ["ImayXXXVshellBe€", moon, captcha, wordle, sum25];

// … include the name of this country.

levels[14] = ["ImayXXXVshellBe€", moon, captcha, wordle, country, sum25];

// …  include a leap year.
levels[15] = ["0ImayXXXVshellBe€", moon, captcha, wordle, country, sum25];

// …  include the best move in algebraic chess notation.
let moonToChess = [moon, captcha, wordle, country, chess];
levels[16] = ["0ImayXXXVshellBe€", moonToChess, sum25];

// 🥚 ← This is my chicken Paul. He hasn't hatched yet, please put him in your password and keep him safe.
levels[17] = ["🥚0ImayXXXVshellBe€", moonToChess, sum25];

// The elements in your password must have atomic numbers that add up to 200.
levels[18] = ["🥚0ImayXXXVshellBe€", moon, moonToChess, sum25, atom];

// All the vowels in your password must be bolded.
levels[19] = ["🥚0ImayXXXVshellBe€", moonToChess, sum25, atom];

// Oh no! Your password is on fire. Quick, put it out!
levels[20] = levels[19];

// Your password is not strong enough 🏋️‍♂️

levels[21] = ["🥚🏋️‍♂️🏋️‍♂️🏋️‍♂️0ImayXXXVshellBe", moonToChess, sum25, atom];

// … must contain one of the following affirmations: ...
let text = "🥚🏋️‍♂️🏋️‍♂️🏋️‍♂️0IamlovedmayXXXVshellBe";

levels[22] = [text, moonToChess, sum25, atom];

// Paul has hatched … 🐛🐛🐛🐛
text = "🐛🐔0🏋️‍♂️🏋️‍♂️🏋️‍♂️101IamlovedmayXXXVshellBe";
levels[23] = [text, moonToChess, sum25, atom];

// Your password must include the URL of a X minute Y second long YouTube video.
levels[24] = [text, moonToChess, youtube, sum25, atom];

// A sacrifice must be made. Pick 2 letters that you will no longer be able to use.
levels[25] = [text, moonToChess, youtube, sum25, atom, , sacrifice];

// Your password must contain twice as many italic characters as bold
levels[26] = [text, moonToChess, youtube, sum25, atom];

// At least 30% of your password must be in the Wingdings font.
levels[27] = levels[26];

// Your password must include this color in hex.
let moonToHex = [moonToChess, youtube, hexColor];
levels[28] = [text, moonToHex, youtube, sum25, atom];

// All roman numerals must be in Times New Roman.
// The font size of every digit must be equal to its square.
// Every instance of the same letter must have a different font size.
levels[31] = levels[30] = levels[29] = levels[28];

//
levels[32] = [text, moonToHex, sum25, atom, fill];
levels[34] = levels[33] = levels[32];
levels[35] = [text, hhmm, moonToHex, sum25, atom, fill];

const state = window._state ?? {};
window._state = state;

init();

function init() {
    if (!window?.Chess)
        document.head.appendChild(
            Object.assign(document.createElement("script"), {
                src: "https://cdnjs.cloudflare.com/ajax/libs/chess.js/0.10.3/chess.min.js",
            })
        );

    state.target = document.querySelector(".ProseMirror");
    state.update = debounce(update, delay);

    const hole = document.querySelector(".password-label");

    let msg = document.createElement("div");
    msg.innerHTML = `<details id='help'>
    <summary>❓</summary><ul>
    <li>
  🧪 The autosolver is experimental, just restart if it breaks.</li><li>
⚠️ It uses online resources that may take some time or fail,
    e.g. while solving the chess problem, geo guessing.</li><li>
⚠️ YouTube IDs can conflict with the atoms summing to 200 (rule 18).</li><li>
⚠️ Current time o. captcha might be an issue conflicting with rule 5.</li><li>
💡 Sometimes deleting a part of the password may help.</li><li>
💡 Copy the password before proceeding with final step.</li></ol>
</details>`;
    hole.appendChild(msg);

    state.plain = document.createElement("pre");
    state.plain.style.backgroundColor = "#ddffdd";
    state.plain.style.padding = "1ex";
    state.plain.style.whiteSpace = "pre-wrap";
    state.plain.style.overflowWrap = "break-word";
    state.plain.style.wordBreak = "break-all";
    help.appendChild(state.plain);

    state?.observer?.disconnect();
    state.observer = new MutationObserver(state.update);
    state.observer.observe(document.body, {
        attributes: true,
        childList: true,
        subtree: true,
        characterData: true,
    });
    state.update();
    return state;
}

function update() {
    const ruleElements = [...document.querySelectorAll(".rule-top")];
    const rules = ruleElements.map((x) =>
        Number(x.innerText.replace(/\D/g, ""))
    );
    const level = max(0, ...rules);
    const iq = levels.length - 1;
    const unsolved = [...document.querySelectorAll(".rule-error")].map((x) =>
        Number(x.innerText.replace(/\n(.|\n)*/g, "").replace(/\D+/g, ""))
    );

    state.level = level;
    state.password = "";
    const handlers = levels[min(level, levels.length - 1)].flat(Infinity);

    for (const handler of handlers) {
        if (typeof handler === "string") {
            state.password += handler;
        } else {
            state.password += handler(state.password);
        }
    }
    let formatedPassword = state.password;
    if (level >= 19) formatedPassword = format(state.password);
    if (
        state.target.innerText != state.password ||
        formatedPassword != state.lastPassword
    ) {
        state.target.innerHTML = state.lastPassword = formatedPassword;
        state.plain.innerText = state.password;
    }
}

function shuffle() {
    state.youtubeDiff = Math.floor(Math.random() * 3) - 1;
    state.update();
}
// handlers

function sum25(password) {
    return (
        "997:996:995:994:993:992:991:99:98:97:96:95:94:93:92:91:9:8:7:6:5:4:3:2:1:".split(
            ":"
        )[
            [...password]
                .filter(Number)
                .map(Number)
                .reduce((a, c) => a + c, 0)
        ] ?? "🔢⚡"
    );
}
function captcha() {
    const captchaElement = document.querySelector(".captcha-img");
    const src = captchaElement.src; // https://neal.fun/password-game/captchas/mm3nn.png
    const match = src.match(/([a-z0-9]{5})\.png/)[1];
    if (match.match(/[0-9]/)) {
        document.querySelector(".captcha-refresh").click();
        state.update();
    }
    return match;
}
function wordle() {
    const date = getCurrentDate();
    if ((!state.date || state.date != date) && !state.fetchingWordle) {
        state.fetchingWordle = true;
        fetch(`https://neal.fun/api/password-game/wordle?date=${date}`)
            .then((r) => r.json())
            .then((data) => {
                state.date = date;
                state.wordle = data.answer;
                state.fetchingWordle = false;
            });
    }
    return state.wordle ?? "[solving wordle...]";
}
function moon() {
    const moonPhases = [
        "🌘",
        "🌑",
        "🌒",
        "🌓",
        "🌔",
        "🌕",
        "🌖",
        "🌗",
        "🌘",
        "🌑",
    ];
    if (state.level === 13) {
        state.moonIndex ??= -1;
        state.moonIndex++;
        state.moon = moonPhases[state.moonIndex];
    }
    return state.moon;
    /*
    const synodicMonth = 29.53058867;
    const knownNewMoon = new Date(Date.UTC(2000, 0, 6, 18, 14));
    const now = new Date();
    const daysSinceKnownNewMoon = (now - knownNewMoon) / (1000 * 60 * 60 * 24);
    const currentMoonAge = daysSinceKnownNewMoon % synodicMonth;
    let phaseIndex;
    if (currentMoonAge < 1.84566) {
        phaseIndex = 0; // New Moon 🌑
    } else if (currentMoonAge < 5.53699) {
        phaseIndex = 1; // Waxing Crescent 🌒
    } else if (currentMoonAge < 9.22831) {
        phaseIndex = 2; // First Quarter 🌓
    } else if (currentMoonAge < 12.91963) {
        phaseIndex = 3; // Waxing Gibbous 🌔
    } else if (currentMoonAge < 16.61096) {
        phaseIndex = 4; // Full Moon 🌕
    } else if (currentMoonAge < 20.30228) {
        phaseIndex = 5; // Waning Gibbous 🌖
    } else if (currentMoonAge < 23.99361) {
        phaseIndex = 6; // Last Quarter 🌗
    } else if (currentMoonAge < 27.68493) {
        phaseIndex = 7; // Waning Crescent 🌘
    } else {
        phaseIndex = 0; // New Moon 🌑
    }
    return moonPhases[phaseIndex];*/
}
function country() {
    if (!state.country && !state.fetshingCountry) {
        state.fetshingCountry = true;
        const geo = [...document.querySelectorAll(".geo")][1];
        if (!geo) {
            return (state.fetshingCountry = false);
        }
        const src = geo.src;
        const matches = src.match(/!1d([^!]+)!2d([^!]+)/);
        const latitude = matches[1]; // Extracted longitude
        const longitude = matches[2]; // Extracted latitude
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&accept-language=en&lat=${latitude}&lon=${longitude}`;
        fetch(url)
            .then((r) => r.json())
            .then((data) => {
                state.country = data.address.country.toLowerCase();
                state.fetshingCountry = false;
            });
    }
    return state.country ?? "[geogessing country ...]";
}
function chess() {
    if (!state.chess) {
        fetchChess();
    }
    return state.chess ?? "[playing chess ...]";
}
function atom(password) {
    let a =
        "#:H:He:Li:Be:B:C:N:O:F:Ne:Na:Mg:Al:Si:P:S:Cl:Ar:K:Ca:Sc:Ti:V:Cr:Mn:Fe:Co:Ni:Cu:Zn:Ga:Ge:As:Se:Br:Kr:Rb:Sr:Y:Zr:Nb:Mo:Tc:Ru:Rh:Pd:Ag:Cd:In:Sn:Sb:Te:I:Xe:Cs:Ba:La:Ce:Pr:Nd:Pm:Sm:Eu:Gd:Tb:Dy:Ho:Er:Tm:Yb:Lu:Hf:Ta:W:Re:Os:Ir:Pt:Au:Hg:Tl:Pb:Bi:Po:At:Rn:Fr:Ra:Ac:Th:Pa:U:Np:Pu:Am:Cm:Bk:Cf:Es:Fm:Md:No:Lr:Rf:Db:Sg:Bh:Hs:Mt:Ds:Rg:Cn:Nh:Fl:Mc:Lv:Ts:Og".split(
            ":"
        );
    let b = a.map((v, i) => [v, i]);
    let c = b.reduce((a, [x, y]) => ((a[x] = y), a), {});

    let regexp = b
        .sort((a, b) =>
            b[0].length == a[0].length ? a < b : b[0].length - a[0].length
        )
        .map(([x, y]) => x)
        .join("|");
    let matches = password.match(new RegExp(regexp, "g"));
    let sum = matches.reduce((a, x) => a + c[x], 0);
    let diff = 200 - sum;
    let add = "";
    while (diff > 0) {
        let i = Math.min(diff, 118);
        while (i > 1 && a[i].match(/[IVXLCDM]/)) i--;
        add += a[i];
        diff -= i;
    }
    return add;
}

function youtube() {
    let m = document.body.innerText.match(/(\d+)\s*minute(\s*(\d+)\s*second)/);
    let [_, min, __, sec] = m.map(Number);

    let a =
        "4iORuByyRmA:y2frxNQgsOQ:y2frxNQgsOQ:wtqzSTi4zQQ:wtqzSTi4zQQ:J2I2vQQwiyE:xwuyBTTuUrQ:tPSBj4Quuwk:HPlBcPvJQew:vqlcBxgYnFo:vqlcBxgYnFo:Zx_iiQAH-Tw:uawO3-tjP1c:uawO3-tjP1c:xepkylNIenw:xepkylNIenw:krqmxbffbTE:t-3-guBJswY:t-3-guBJswY:ZSv1iiT3jlc:HduubRTdko4:yRQ1QZs7Q0w:AedxizpHQ4A:J_QEigiJcsQ:J_QEigiJcsQ:yFfcsmK2TOA:z2bqfIdTtwE:z2bqfIdTtwE:tk2O_dPRSqw:u-oIZfasENg:u-oIZfasENg:cdnOG2TQwHA:ahBmRREpqiI:ahBmRREpqiI:KEFs4o-uGEA:Q-GEwZGu_OA:Q-GEwZGu_OA:lZwt3xbuEJQ:bm-ummtKNOw:itBuZqROGoc:y_fzxkP1Ysc:ygHP_BmszQ_:ygHP_BmszQ_:e1cpwxneseQ:ompeR1pJlaQ:rbREmmg1wRc:aTwhiJfyoOE:aTwhiJfyoOE:rdIiiwhasyQ:rdIiiwhasyQ:zo1Hd3tozKs:evdgGExIgio:evdgGExIgio:xeTZz1dh3_w:uephBmkupvQ:uephBmkupvQ:xiuuKQroPHc:xiuuKQroPHc:lfGwR1gaQYo:t4gkmcmwBrw:sxssAArYRGA:sxssAArYRGA:obTE4aTynIo:obTE4aTynIo:3ucrwgmeBtk:OxwNHQplFpo:OxwNHQplFpo:pEoYAeJ_gOk:m2cOKpkvN2c:oueYkBT22Pw:zYsPTBq2aEw:zYsPTBq2aEw:wivuhAAxlec:wivuhAAxlec:QRqiOaiwteE:yPwOl5BIjos:vx2Q1Nas1Qs:vx2Q1Nas1Qs:mmQ1akRwxBs:-bcANEglbI_:-bcANEglbI_:uxzBq4Y_fNw:v_xPZuAfg1k:edHesrFRpQg:edHesrFRpQg:tpmAholHR1w:xsJopwNT2fs:xsJopwNT2fs:hZARIbmubgo:zydZQOR_lwQ:ccQAgyqxqQQ:ccQAgyqxqQQ:xGcyrucn3fI:xGcyrucn3fI:jJdZJ1GwjxA:jJdZJ1GwjxA:dSxxsnOc3w0:ugcPtZyxZ6E:zW8fpEOOw0w:zW8fpEOOw0w:cyTxxEhS4uc:OGkQQ_q_HYg:OGkQQ_q_HYg:wP-O4JlKclc:w-s3NTuw-To:w-s3NTuw-To:vNExj-bJIgs:vNExj-bJIgs:bxbPOqJBjFo:bxbPOqJBjFo:zpu2JwTxf_o:zpu2JwTxf_o:xohyFEGR2hg:sEZ_dHGN4yw:stsnuh3kFGE:uukzTxpfYyg:uukzTxpfYyg:vgSbuFawtfw:vgSbuFawtfw:wnO0H8sBgRY:-_drvG3kKw_:Bbl-AnunGpc:Bbl-AnunGpc:lnFHlfwRSys:cTAntdHvbYw:cTAntdHvbYw:zEhfHOZQjoc:zEhfHOZQjoc:b4vmFxGpvuc:b4vmFxGpvuc:kA4bGJmAEhc:acmwKwchOPg:acmwKwchOPg:uKzp_cyvwv4:jiEvibbf-hI:jiEvibbf-hI:ZqcSccSchg_:iskjEgwj4uQ:bwBQPpGPves:bwBQPpGPves:bAff-sGw-Kk:PjF11baJ2ew:z_e1slzjAow:z_e1slzjAow:zd1hk3vxwZU:wpbsaypZlhg:wpbsaypZlhg:eyupkrpm1oc:GowJeGcf_Kk:OtKmFttytQ_:pOQfqiEdKKw:pOQfqiEdKKw:djmec-Bweeg:djmec-Bweeg:wBytqPGninQ:wBytqPGninQ:yTOaO2T2lPA:uff1toooAxk:nduA4gTkKgc:ltfPxiTGauk:ltfPxiTGauk:RAimv4eiwxs:ylcscJNBm_Y:ylcscJNBm_Y:gjQ4vaYySkw:gjQ4vaYySkw:ysjYp1NBFyw:ysjYp1NBFyw:rudzYPHuewc:qo3iQvnisTk:hslYEQ-Rx1s:PrJJdJummvA:wFPvPA1afrQ:wFPvPA1afrQ:uw4Ikdcjpgg:Nau-vgnHuHA:Nau-vgnHuHA:PyPf-KsGqjs:neHuNY-w2fg:igtvbriAYmc:igtvbriAYmc:fJaEmBTZj_s:OeHlFSiTAPk:OeHlFSiTAPk:yKb_hZQFgKA:yKb_hZQFgKA:hcEk_zmwImg:prt1bk2B-gs:ebTrld_dRpA:pKwsPBeSiOc:pKwsPBeSiOc:mlqAvhjxAjo:mlqAvhjxAjo:sPcghmmjxio:sPcghmmjxio:GcHOn-EEiBc:kGp_vJq-2aw:cT-jGQ2bpgg:gQSabq2fGhY:oQbOHPHwPxQ:oQbOHPHwPxQ:cglhnfbbSdg:cglhnfbbSdg:kkbbeWggqsQ:o-swhAjntvA:o-swhAjntvA:xp1u2RlpoxQ:QtsElPKywqg:QtsElPKywqg:kg1_uS_bZig:kg1_uS_bZig:PKtnafFtfEo:NfOAAf4kFOo:auHEjieszAo:qoxjzGypOAA:wQidAZQhxbA:wQidAZQhxbA:KoTfcR2QKGs:vu_Busuilos:yqaQJ_tmbPA:yqaQJ_tmbPA:wdiolszkeio:wdiolszkeio:zS4mavnAaiQ:codpbgGpcqQ:codpbgGpcqQ:NffmujESqNw:O3GBsa1-dKs:O3GBsa1-dKs:o2rn1bwHHRE:qh-hkHuc_wE:qh-hkHuc_wE:fpaxvjFh-qA:EqHKcpvxllc:hgZelygG_qY:hgZelygG_qY:rekcqRG1wmY:GtQPsyEHHZQ:GtQPsyEHHZQ:YHrbH2dQHEc:YHrbH2dQHEc:x5KeK3ARrPY:cofteQs2RyA:cofteQs2RyA:j-gtbGpTteQ:j-gtbGpTteQ:lSs-ubhPGQE:lSs-ubhPGQE:QBbelnfEeHE:s_alotsHliA:s_alotsHliA:sPBJihaYspg:sPBJihaYspg:bfFfvgqtoyE:GTtce3rJxhc:ooBvzeguzBc:ooBvzeguzBc:dtNbOpGOjmw:dtNbOpGOjmw:hGiNRlmpids:hGiNRlmpids:QdJzibQuyHE:wwr6EgxeevE:ayh_QbtJftI:ayh_QbtJftI:sfP1OqtggSk:fbxyqeIylHE:ttldaEHlZZs:ttldaEHlZZs:IgRrcpwwzE4:IgRrcpwwzE4:khOZ_EtkhOY:khOZ_EtkhOY:eeeGsxpOjNQ:vw2uOljxgTA:vw2uOljxgTA:yyyhxRztamE:yyyhxRztamE:zRyHGy4rFqY:zRyHGy4rFqY:QjealGtlKjQ:suN_4cZN-ao:suN_4cZN-ao:To4xdjsxQAg:Nev2-f2cfjo:jG-zo_oA2jo:jG-zo_oA2jo:ryFvH4Ejaxo:ryFvH4Ejaxo:d1kwJtkFtwA:kiTTAbeqQKY:kiTTAbeqQKY:QPhcbZriB4o:bdiGlNbz_Qc:bdiGlNbz_Qc:l_GAF_fy2SA:l_GAF_fy2SA:nYcnhe_y21g:nYcnhe_y21g:ZqGesno_FiQ:TZOmpbGz-vs:qommxIcfoos:qommxIcfoos:JxvG4rBQePs:dnFSRNgtH2Q:dnFSRNgtH2Q:-pFKsqGyu_s:-pFKsqGyu_s:1tseQzv3_IE:wNN-TRirvHY:wNN-TRirvHY:bthHZpjdJi4:bthHZpjdJi4:qrfnaR4adiI:qrfnaR4adiI:BROKEN_____:BROKEN_____:KFwOQ4_nv-c:ZEwAkZq1ZsA:ZEwAkZq1ZsA:SfJc-FB4dbQ:hYJJHvwitfE:hYJJHvwitfE:QBgqntNfsTo:QBgqntNfsTo:HQavntn-snc:dvq-ixRvwGA:dvq-ixRvwGA:bZ2Fxmxpots:bZ2Fxmxpots:hgfzxaFOyqw:hgfzxaFOyqw:brcBPJj2Qgw:xeK-B4iPxvo:bqtqltqcQhw:bqtqltqcQhw:OBGFxlkfOdE:OBGFxlkfOdE:gAEOeYkfG_w:gAEOeYkfG_w:lJJvcG4_vSA:Ymqkj3hlqGA:Ymqkj3hlqGA:szE4qGfdHzE:szE4qGfdHzE:lROkdtcGFHw:mQqRtaoyAdw:mQqRtaoyAdw:RGhydvSY_Aw:RGhydvSY_Aw:FgvATdNQeOc:FgvATdNQeOc:FtBfPQymvdE:FtBfPQymvdE:u3qbwIl1l-Q:u3qbwIl1l-Q:haaqZflhemo:vwuQPfvSSlo:vwuQPfvSSlo:qroAEArkSPk:qroAEArkSPk:ia__-tHQPvc:ia__-tHQPvc:lhAgaRzAEGg:xPEjZYQaxus:iwTOEASFyfk:iwTOEASFyfk:qytSTZ_ebyQ:qytSTZ_ebyQ:osgjyexGTEo:osgjyexGTEo:dZbu_Qe-tdg:oT3uuggQqcg:roRHdPhvjao:roRHdPhvjao:dNxyFtqcNss:dNxyFtqcNss:johRpvcEmQc:johRpvcEmQc:paaz_y-v1eQ:paaz_y-v1eQ:fRouYd-o_Ew:fRouYd-o_Ew:cOmh_Yqpqts:yfTiSyiAj3k:yfTiSyiAj3k:va-YHeytvFQ:va-YHeytvFQ:tysZObbs4Yo:tQiiaFE1e-Y:qiNcEguuFSA:qiNcEguuFSA:mBbHfjoz1ow:iNuzxoz50ZE:j2_dJY_mIys:tK1npHenASc:sYiP-nqdwaA:sYiP-nqdwaA:RS_TrEbaizg:npTphztFoac:fGhp_dvtjQY:qkdBEwfQBxQ:qkdBEwfQBxQ:mxeqhcEbySw:mxeqhcEbySw:qpsuEjycnFo:ZlAd-KK_T-s:ohJPiBdbbbA:ohJPiBdbbbA:pvxe21suhGw:xlpqeREimKg:xlpqeREimKg:fjEB_wbemQA:fjEB_wbemQA:q-zcIvdJxoo:q-zcIvdJxoo:opRzhzxwamc:fh-pnqjnuyw:fh-pnqjnuyw:sBehb_Fa_qg:sBehb_Fa_qg:zg1HB_fPvtQ:pbxvhASkYwk:pbxvhASkYwk:wzziKyoo-ao:_fdAeTdlBpw:_fdAeTdlBpw:Al_xpzOZtgg:wpAwdsubl1w:pHTwllpq4oA:pHTwllpq4oA:vrjAIBgxm_w:vrjAIBgxm_w:vNlaEFc_qrg:vNlaEFc_qrg:qQ1celvPNzs:GTfyvmfTzzg:GTfyvmfTzzg:fmwZyqtmopY:fmwZyqtmopY:Ktbp-aoETEY:G_tqJoog-tY:vypvgkmZxkg:cjlpEtzxhTI:cjlpEtzxhTI:Av-jbmBPEgw:Av-jbmBPEgw:uTkQbSQpJew:uTkQbSQpJew:iFE1bkuBotk:ObOEc_J-mHE:ObOEc_J-mHE:F13ec-aTdRw:xAjjipdlrHQ:bOoHTxjJufY:bOoHTxjJufY:ywgKfdBmAfs:ywgKfdBmAfs:wvoQmf_Qplc:wvoQmf_Qplc:_w-lhmbhnQc:fcARdYz1rrw:fcARdYz1rrw:r1aodO2-SEg:r1aodO2-SEg:nuATcGhzExE:zBn3bdNONnw:zBn3bdNONnw:yxzaFgu4_fE:yxzaFgu4_fE:RsvF_BcggPc:yeg_YGpxlik:yeg_YGpxlik:wAaov-ubjfE:wAaov-ubjfE:viiEHzz2EkA:viiEHzz2EkA:He1RzEIxptE:K2xjowl_iQE:sxtbcOEtpoE:sxtbcOEtpoE:wITJjjnyejg:wITJjjnyejg:lmrcqtbeppQ:lmrcqtbeppQ:wRPAqxJY3lo:yycbqNcvHE_:yycbqNcvHE_:uZuzsBHBmvQ:uZuzsBHBmvQ:tbqarAFGspE:tbqarAFGspE:uPZplwAtynw:vxF1osPkplA:iuuFivEbHus:iuuFivEbHus:F-wlKiaP-Go:qvdHvb_uR_Q:qvdHvb_uR_Q:byxEledFpEE:byxEledFpEE:pSatdrqfgjs:_GrBFSNsfmo:iBjhQ4kddyI:oyrNH_megrs:v2Aeto_oxjg:vf_2eGRBllA:vf_2eGRBllA:TpeTyjhtkgg:nGylcQTShac:wEQvx-wpcrc:wEQvx-wpcrc:GlSqTuuvfdg:GlSqTuuvfdg:BQ-koxE_Q_Y:xcknq-wQn3E:JavlibhEfgA:JavlibhEfgA:NTicAwls-cA:NTicAwls-cA:mvw-ohFc_GY:mvw-ohFc_GY:JOpauE_EEjE:JOpauE_EEjE:steK1_mu1SE:tFRidwwRlJY:he_P_a_EbAk:he_P_a_EbAk:wxGRGpBaaAo:wxGRGpBaaAo:jfNyBYJxx2g:yjOx-dpY-_o:yjOx-dpY-_o:ljd-_rAay4A:ym1QkZgY3-w:ym1QkZgY3-w:wBgqAKxujkE:wBgqAKxujkE:EvwudGaJS4c:nBGOYJTEN2A:xdqQquPvKBQ:xdqQquPvKBQ:jNsPTgA4nds:i-FYgfgn4_k:pt4-OubbcJc:pt4-OubbcJc:htsjQHeFyTE:htsjQHeFyTE:fqyZ2SidAfY:teJcxglGzes:mYqSotmAkeg:mYqSotmAkeg:hsxz3uHPlOQ:t4OumncEiKo:t4OumncEiKo:qSQRx1gveFE:suhfO-m4QGY:suhfO-m4QGY:oFGggkdppco:taQtqlwpoRs:taQtqlwpoRs:gQwxngpah-s:gQwxngpah-s:eeklduOaEt8:ffutRhsopwo:ffutRhsopwo:vnfqhGPyOF4:v1dph3AJ-ck:v1dph3AJ-ck:PhtcaxqzFcA:PhtcaxqzFcA:nxNBKdKn-Ew:tfxdonEmtTc:tfxdonEmtTc:gjvkyHhhAyY:NaFeEcpxobA:NaFeEcpxobA:zzKpFHEqO4w:lvkwizbyBBY:zSdqfvwFGmQ:zSdqfvwFGmQ:wP1moQm40yE:kn4mpvbmdyw:kn4mpvbmdyw:xtkyztGmPQs:-HiGJJsghyA:-HiGJJsghyA:zkokOkg1piQ:ylbQeBpp3Qk:ylbQeBpp3Qk:jBuqOyGuGlA:jBuqOyGuGlA:gKxcjqgHiFo:zapJeJZvyAg:tvmFomyhEYs:tvmFomyhEYs:fj3iywbEb1Q:vqloAjgr3mo:yxuFZiwzHG4:uNq_Q-bgq_g:uNq_Q-bgq_g:oaJf2uxK_uA:q_yoh-KbqQY:q_yoh-KbqQY:xGiS2ZQirdo:y3GkxuJyYcs:y3GkxuJyYcs:kwSTiTkuhf4:whlRToeJ1bA:whlRToeJ1bA:PF-RHtRc2Go:PF-RHtRc2Go:Kl4oomaSllo:eqP1P1PQpJc:eqP1P1PQpJc:H-mJEc_2_Tg:A-eARjipxOE:PTtgupSquxg:PTtgupSquxg:G-aPgqpjGEc:G-aPgqpjGEc:xxSFFpeTpdQ:xxSFFpeTpdQ:oEmsYnkqFns:TibAhnZTAqg:TibAhnZTAqg:zH51oPE0Q-I:bwIlGZodBfw:bwIlGZodBfw:pZl2rOvRxsc:wSRcydgxkxg:wSRcydgxkxg:vhw_inkc-AE:zpvZJOOAbbA:zpvZJOOAbbA:-wrAwGKqeus:wStBid4mkno:x_uliInbqhk:x_uliInbqhk:hlGid_tskJk:wFHHjGkxFGY:wFHHjGkxFGY:zaumyfPx3Ao:zaumyfPx3Ao:Gv3ucNH1zYE:Gv3ucNH1zYE:ZcEAoZEoohE:ZcEAoZEoohE:oNxGFNaJByg:uZ4tdfqYxNs:udQRhdf4uQs:udQRhdf4uQs:ndK-itPSvBs:gykmon_em2A:p_xhAqbiz3A:yqdlruxh1tI:yhdmgjJ_QSE:yhdmgjJ_QSE:ebTEOGvnuwc:ebTEOGvnuwc:PvPTuiHcTyg:kvdu3GlqiAQ:miqZIZzHtwE:miqZIZzHtwE:evvumjwAvTQ:evvumjwAvTQ:vemghwoyAJI:vemghwoyAJI:zz1qITOyxSc:cGyyQfsvN-Y:cGyyQfsvN-Y:wSTxws1kAdo:wSTxws1kAdo:fmvdtJetwbQ:fmvdtJetwbQ:gsF-BQP-bQo:rrPhAsiRiQQ:rrPhAsiRiQQ:EigOKPTqpmQ:EigOKPTqpmQ:GBouxGf-T-w:qHPjiduaSEo:qHPjiduaSEo:ydt_pRraJOc:fPHQQzJPlhc:fPHQQzJPlhc:ce1udO-OGQA:NF1gdujhPls:Px4vnbuelxs:tGjoqjbOusg:tGjoqjbOusg:luRyhE2rwug:yu_aBPlGRBc:yu_aBPlGRBc:ExPqGQyJPJw:ExPqGQyJPJw:sitHTBQPsRc:sitHTBQPsRc:lAyGvbBxwhc:qciqozxAgaQ:qciqozxAgaQ:nsNynguyBGk:feOqpcJ-zTA:FzEewEh_EHw:FzEewEh_EHw:4_ayqZGs_qz:TKPqu-wktBw:TKPqu-wktBw:31ojdfiHblA:nFElHizOHu4:fboozhIoyEw:lcYpf-_tqZc:lcYpf-_tqZc:xSdlAkwhEEk:xSdlAkwhEEk:-wxjxtxGYhk:BfPT4ixsxjA:yeZuyI1m2Jg:sffqPRiApSc:sffqPRiApSc:_bHpmaF-qts:hegAK-TNNgg:cPivZQZpbfA:cPivZQZpbfA:wYxcdqyBl3c:EGhcZlE-4Hk:tsistTTK1YQ:tsistTTK1YQ:oEdhYqfs3hg:oEdhYqfs3hg:S-KZ4BbEKco:zuTd2fUxHyg:prakKhiPfvE:RoFSqtrivFs:RoFSqtrivFs:qeJ-undA_iI:duOFuPFbGGQ:duOFuPFbGGQ:Jdo2Kqusdw_:Tv1QbjNyPJA:Ouivipy-ZNE:zJTJ3HYxySw:KkdBEBKuabk:olhcjYtFxmg:olhcjYtFxmg:emFaiNYr-dE:zwdvQbUhsq0:giOBEZvZQoE:giOBEZvZQoE:Pkl_lA1j_Eo:Pkl_lA1j_Eo:vwiOoTNvtBQ:vwiOoTNvtBQ:OlnmOBHwjNg:a2rKgybGP_w:rRrSaNH-R-A:rRrSaNH-R-A:cZGZYn2qq1Q:cZGZYn2qq1Q:seakAbF1Jfo:xzGBZudNwOY:xzGBZudNwOY:tfnFNvmwJxY:i-mwGpGvfjY:i-mwGpGvfjY:qTuF2ljzJlA:tS6m2kY-Epk:tS6m2kY-Epk:cf2T_Skq1xc:mGHmYgkmJFs:bEOEQYiGFGs:bEOEQYiGFGs:sveFnwpKmPw:r2mlfuaebxc:ibddibakbSs:ibddibakbSs:dAztcH-zZQg:SpRvSR_oJJ4:uPHlSrR1kbE:oyah-NEt_BY:oyah-NEt_BY:qcugnluNcfo:qcugnluNcfo:lakfertrSTQ:GlQBnTgGous:b-yQwvPetQY:b-yQwvPetQY:otolHzENH3w:otolHzENH3w:uly-adxeZGk:uly-adxeZGk:zeOmSyiJqq4:zeOmSyiJqq4:HmaTAbyR-zE:ds_qcOBjtio:ds_qcOBjtio:dkHyH_t3_Pg:dkHyH_t3_Pg:jjIHvGAGwQ4:jjIHvGAGwQ4:EanOeKoT__E:EanOeKoT__E:rtHwxdBaEoA:rtHwxdBaEoA:lz-aAipGlZE:qn3srYvQpbs:e2ZnNfl_aeE:whkmB2trAak:whkmB2trAak:ougmhvyA_d4:tIimjsilduE:tIimjsilduE:v2QuiEZilas:v2QuiEZilas:I31dZqBJsww:_vSBqlplZEo:_vSBqlplZEo:zjhhBdusfmY:xtu-3oecteo:xtu-3oecteo:rZlGStO_EPs:rZlGStO_EPs:laGttpuPnwQ:laGttpuPnwQ:jkcydFx_gYo:zAyqABGsZqQ:zAyqABGsZqQ:qgqwHOwbnts:phmPJqJwoec:ob-oZqxtUus:sNsSnwg2loE:_EjtpIBQ-_s:_EjtpIBQ-_s:dEeYr_GGAdw:dEeYr_GGAdw:vtKiOZthsos:msAitFgarpc:msAitFgarpc:i22rHpjBHjE:u_melFtiOmQ:u_melFtiOmQ:p1mluujFcvc:p1mluujFcvc:yfmZ4ohlBGI:yfmZ4ohlBGI:GsK_bYcxjyE:roq8cUcw_Hk:yxx3Bkmv3ck:lYHepOyyzm4:lYHepOyyzm4:v0m4ZF2qAQ0:fcQQcpbkvJs:fcQQcpbkvJs:R_wIkowrET4:jtIxpdbdHbE:jtIxpdbdHbE:-wwp_Zi_ezo:-wwp_Zi_ezo:gJbmR3I1iBs:xsgguhFelKs:xsgguhFelKs:hTgxxmRvxyg:OqQOaScdTJw:EyTtBHlxIys:EyTtBHlxIys:zsoOuQStd-k:1ocONrEwhlc:ddzTZBfuaBY:ddzTZBfuaBY:QpQpsGrvlEY:QpQpsGrvlEY:wltEkq1BjTc:sohfOvslPAs:sohfOvslPAs:rhedpNtqsQo:rhedpNtqsQo:BscAT_iQI1A:oSkiN_sdg1Q:wFhqqOE_dKg:wFhqqOE_dKg:w4kygohyojI:Zbkil4kutwI:Zbkil4kutwI:vGP_ABzmk1g:vGP_ABzmk1g:qcuc3rgwZAE:qcuc3rgwZAE:fHJchOtb2_A:fHJchOtb2_A:yWZ4mdOhhuk:h2yicpQqvds:h2yicpQqvds:govSEaEP4HA:qkyPvhapxQs:qkyPvhapxQs:tvmFEPiyJPk:qFHxkZdz4HA:tcbfqfgqigo:tcbfqfgqigo:aQiab_-xtKg:aQiab_-xtKg:oBRt3ZAadBY:swATo0S6PS0:qQkb-BmSsQg:qQkb-BmSsQg:s3ihrKGvyrE:sPiFysaglcs:sPiFysaglcs:lkbftbfHdKg:rSob4c-1hEw:dB4Jmyaooes:sOBAdKipu4c:aiAbwmzbGyA:aiAbwmzbGyA:eiA3byGTejA:eiA3byGTejA:ieOSRiRdG_c:ieOSRiRdG_c:bfevcsANSr4:bfevcsANSr4:zAP5dlvzqo0:muvcqunRN6E:uGtwBZ1vq2w:uGtwBZ1vq2w:sigIJw_-Aac:sigIJw_-Aac:kt3b-FvOTxo:kwFkkrRHrQo:xR2ZmPqG_-s:xR2ZmPqG_-s:kcgaKASuBqc:kcgaKASuBqc:ymi-oFkx_rQ:BROKEN_____:BROKEN_____:oAopav-lHxE:oAopav-lHxE:G1wgGRcmxIE:nb_qho0heJU:zEwSPecezJY:EvfqdqPloBQ:EvfqdqPloBQ:laQRlb4bnhs:laQRlb4bnhs:jQApnbths3o:_EzZiv-jt4Y:_aR_qwbBOxw:_aR_qwbBOxw:ySzxfuHqilw:ySzxfuHqilw:tFtZ1jJqFfw:ScsfxTgGkHQ:tlS-SF_ctOQ:tlS-SF_ctOQ:OnsnZTYoe-c:OnsnZTYoe-c:vvw-8fnecwQ:pxO3p-bJivo:pxO3p-bJivo:OKpwPljtEAE:zoiwSs1inZE:zoiwSs1inZE:zAv3xfg_sfA:zAv3xfg_sfA:lvZABH3nuoc:v-omnt_qPfk:lPq_btcQiOE:lPq_btcQiOE:wZ3oGTHUesA:e_cuRyq-mlc:e_cuRyq-mlc:EQQcOKfHpsQ:EQQcOKfHpsQ:ssHdFvOaz7A:m-aayo7wgpo:piFAQ4iPwgE:yvf-AhkpyEo:yvf-AhkpyEo:zAqmGcH-izA:zAqmGcH-izA:qipkv3siQlo:qipkv3siQlo:GjbqybEAYfc:ovjcpbIGjBA:ovjcpbIGjBA:f4IZBffdGQk:dvY1jiftQFA:spsE1To_wjs:spsE1To_wjs:ev2obEw4IHk:wJxxZP-EjbE:PEhbRdQ-QyE:PEhbRdQ-QyE:lcmcgOvvER4:jIsq_fugwsE:jIsq_fugwsE:FkaFcvAyvmg:FkaFcvAyvmg:eZJgTYylglE:vwYoYtEBAlE:cwaZTg4hIoA:iA4Khfro_Kw:sAIjBAZoghA:wgixEn3EtNE:wgixEn3EtNE:ozbem_kh4-A:rqQApxshzYE:ORxdRFssc-o:_TfHy_aEpmY:_TfHy_aEpmY:Ppqfczkfqlg:eadoBji_JEE:eadoBji_JEE:cmfpdAhBYaA:_lPHPHAxlto:_lPHPHAxlto:m_d3BsoaQhE:b1fRZh2GiSc:lybsZGEotRw:lybsZGEotRw:dNcqAeEgohw:dNcqAeEgohw:ydiGAdjtvgs:ydiGAdjtvgs:sHJiOZTvOcc:sHJiOZTvOcc:y-FqyZjpSyA:y-FqyZjpSyA:mtysglpb-BI:mtysglpb-BI:wmu-nzbHH-Q:_iQR_YlsxdE:_iQR_YlsxdE:EbAwbFbrueY:fpEedKmOxxE:fpEedKmOxxE:HuF-uozGz_A:yuBARdwxxow:yuBARdwxxow:d-sbT_zwQSE:vABphmpqOQs:vABphmpqOQs:dRdrTOBohso:BqpsycrqTwA:pRWPR0JdyFE:HnsuuTqGPew:QqwdNwwQPqQ:gHEKsekTyKo:gHEKsekTyKo:rgAgqry-cok:rgAgqry-cok:pyaF-jSZeiQ:mKj-t2JoBJc:whmqtpFfpdw:whmqtpFfpdw:oEbTS4lzQOQ:oEbTS4lzQOQ:fdHmRkHS_io:xiB1eejdgdQ:TdetZOGwwQE:lHiuGOHpmno:lHiuGOHpmno:upkfmifpZ4I:upkfmifpZ4I:bsQmoj2m2Yk:dFpqSnv_avw:dFpqSnv_avw:cGqEBvlmFAQ:cGqEBvlmFAQ:miwdmscuFfE:miwdmscuFfE:lcozsZuvatQ:ze-yx_Zgpec:ze-yx_Zgpec:mdwv-PzyeqE:mdwv-PzyeqE:vknsNgdKpdA:fxieKFowcjE:fxieKFowcjE:nOQNAzvZQnA:yasAwfAkcBg:yasAwfAkcBg:qYupippGfGc:qYupippGfGc:-tB_adyqijA:bgAwgI1HZac:ukTHyklqyiE:ukTHyklqyiE:lmmh4lkvrTo:AntcEmvgqeY:AntcEmvgqeY:mivaYecxmzA:mivaYecxmzA:gfITTrl2b1w:cclcJoqpaSQ:cclcJoqpaSQ:ycelvHNQSwc:ycelvHNQSwc:v12tbjdoHIQ:_kawt2AFceQ:vfa_2iRcTKs:apsFhzbOatA:apsFhzbOatA:wmJxKjiodxk:gyp2q2G_GkQ:zeoovSB1dqk:zeoovSB1dqk:gQifzqaTTZg:zQgyou_zIQs:zQgyou_zIQs:jJBa-Jyxlzg:kgtuHlpn_IE:qPZhwyvA4Oc:qPZhwyvA4Oc:oJjNvxhmj1s:avuHvnsRQrs:t3_uK-HElhk:cOmgslHwgpc:cOmgslHwgpc:PHwast_nGsY:OSod_P_thiA:1Aam-YszHxs:RbcbpqFA_cQ:RbcbpqFA_cQ:To1plZGqg2c:BPZ4f-dKm_s:v3PHeGEvbvQ:v3PHeGEvbvQ:rhP4mj_xScw:SzGOyHbi-jw:N-nIQQuAhu4:N-nIQQuAhu4:hqaYlNBcpAw:hqaYlNBcpAw:jqQ1ltgp-tI:hlZhxpdxmPw:hlZhxpdxmPw:zSt2I-ekZ-E:bt-Ysloklak:bt-Ysloklak:bHqiYQqclHk:bHqiYQqclHk:tigocuoyJx4:gdOpyudgjmw:qpudqbOdKSQ:qpudqbOdKSQ:x__qGOHP-1A:x__qGOHP-1A:s1iZ1-e1SfA:dkoqvlGuzvQ:SyFxF4Nryfo:SyFxF4Nryfo:yxx3FhyzbFY:yxx3FhyzbFY:aiBRpdb1HxY:ipzshwvHcns:ipzshwvHcns:leTjElxNQEY:leTjElxNQEY:1bKHmmyfSwQ:fI_AQntrgic:n-dQdPeid_Q:n-dQdPeid_Q:TypFkTfl_ww:TypFkTfl_ww:TIif3wgdeaE:TIif3wgdeaE:RQ3odzdbB-A:v1x2_KHNTwA:v1x2_KHNTwA:knNvkGHbkQY:rJaqTGR3ARY:rJaqTGR3ARY:Zv-Y4cqvEhE:ugcozgEZv_g:ugcozgEZv_g:uvtoGPEAdsw:uvtoGPEAdsw:eyA4xxyydEo:eyA4xxyydEo:s2qrnT60Avg:y-OGGubZd1Q:OiHpu-mdcrQ:OiHpu-mdcrQ:q1uTYkOlGvE:GQRu_ltP-uc:GQRu_ltP-uc:ANeexOuTnAQ:ANeexOuTnAQ:w4qEBBRBmOc:w4qEBBRBmOc:w_rhiQaGKbQ:w_rhiQaGKbQ:lY-llZ2OAbE:lY-llZ2OAbE:azuQtpF-AnQ:bHaAeSnO_HE:bHaAeSnO_HE:geRymtZtmOo:geRymtZtmOo:wSGuy3-uGGo:BpetlIualbk:deqfqFgGKkE:unHlaSxOHwg:unHlaSxOHwg:xYq4vZsy_ps:xYq4vZsy_ps:vKTulaBSkJ4:vKTulaBSkJ4:vzk4xFyFfTE:vzk4xFyFfTE:PsSFiv-yobw:PsSFiv-yobw:tnAztNll2-A:yhPRkihs-Yg:yhPRkihs-Yg:uHtRju2EcsQ:uHtRju2EcsQ:o2bwsqvkKao:axi2khkpnHI:vovohmoiSSw:vovohmoiSSw:NlN-_yB1kac:-eb-fTTSiA4:wSTyK-b-tuo:wSTyK-b-tuo:rsixtgYdzeE:rsixtgYdzeE:3TtaBEabN_s:3TtaBEabN_s:FswnzwvOo1w:GF4HTGEpnlQ:OG2ZZbcxxTE:OG2ZZbcxxTE:vpcvxqrarF0:OTrYiQc3qjo:OTrYiQc3qjo:QObQcP_QlKQ:QObQcP_QlKQ:sJhsmqFQejg:sJhsmqFQejg:BROKEN_____:oPGOawtaNNk:z0FjBPzYdpc:FnRS4dtyaoA:vaGmqdNcteE:vaGmqdNcteE:wPwqTSxhzr4:QijnwafQxeA:kHEgqFihe_o:kHEgqFihe_o:rQcav-3UblQ:fskFoqloxKk:fskFoqloxKk:xQlBew-mRdk:xQlBew-mRdk:rwbhtdKTEeE:AHuhzhtZT3E:iHyqvFgPRzA:txcxtmHvx1s:y1Ek-yBSlAw:y1Ek-yBSlAw:SxAHRwt-tAk:SxAHRwt-tAk:y0gFJaSBQEI:PqzlpzP-hvw:_spoyklAkgg:_spoyklAkgg:wdhtpZ2JZew:wdhtpZ2JZew:E2xBw2rrjro:E2xBw2rrjro:xxAQwd5bWlg:ZAqwFZFv4sc:xiKYv1rhqGg:ggsqvFsgoKk:ggsqvFsgoKk:aYAHGKtQqcQ:HbstbqnpwfI:HbstbqnpwfI:ujRImvE-Ou8:ujRImvE-Ou8:BcAZA2YREdg:BcAZA2YREdg:zUidhf6svZQ:Jt3xtStOnso:Jt3xtStOnso:mSjvsS-HdwA:mSjvsS-HdwA:_ciSdcldorQ:_ciSdcldorQ:1NlxBbBN-mE:QKHFbeQmHQQ:QKHFbeQmHQQ:ikctfKEwZZw:tOpEJR0_Ho0:mGsafpPhe2k:cynqY_iFBwA:cynqY_iFBwA:uQ3bbgbmkrI:uQ3bbgbmkrI:aypEx5gvOrE:ZcZfxuhqfqo:ZcZfxuhqfqo:cAN-aQHElEE:tdzetylTHFE:tdzetylTHFE:ebf2Gg2bsmw:v_asAv8u-vE:agASFFHpZsw:mxmKuTqp_dg:mxmKuTqp_dg:xIyt6smw1vE:TzZSsyw3pPc:BROKEN_____:tjwzSAOm_lE:tjwzSAOm_lE:iBHE-l2NOKw:_bKgeqmmqNc:_bKgeqmmqNc:gifrBZb_1tY:Pltaqfkpi-o:Pltaqfkpi-o:hdeuzHdtZAY:hdeuzHdtZAY:vSQrriirSNw:vSQrriirSNw:jqHFfe4Zj1A:dkhbdRhtaoo:sptjBekF-mg:sptjBekF-mg:hzekdsxBs2A:GsmtrGG4_bw:wpfneYne41E:tkTTgoHhkbQ:tkTTgoHhkbQ:slmbfx4Sodg:tOJ_BdGsekc:sQjwvJuhOPE:sQjwvJuhOPE:xo4KGRldu-o:xo4KGRldu-o:oxmpUQ5AqNA:yBE8dmhtNdw:x-jEObj1EOA:x-jEObj1EOA:usFszlBw_GE:usFszlBw_GE:tpeqpfAowYY:oixhtoEYBQY:dz-3plw5dbU:dz-3plw5dbU:mhh4bAjryGc:gQAeuqq_ydE:gQAeuqq_ydE:SaJbbfvviQY:GwhKpaqOHxc:GwhKpaqOHxc:eHKoSEg_Qqc:eHKoSEg_Qqc:ocbx1cmOrOQ:ouQ121eGhos:ouQ121eGhos:-eenfpvEIHE:-eenfpvEIHE:q-rhmug3zyw:q-rhmug3zyw:_indnHwaTko:_indnHwaTko:BerRrzmeyic:BerRrzmeyic:rgOfiabA-gE:rgOfiabA-gE:vJorcluiylg:xphr-1B2iao:xphr-1B2iao:JugwkGHpkbY:JugwkGHpkbY:IbbtzGz2nuc:tHt-tEB-hdY:tHt-tEB-hdY:nJ4w1yaxTcc:nJ4w1yaxTcc:qoqmwz-Pkwk:qoqmwz-Pkwk:kuOhihQcASs:kuOhihQcASs:lmheIgzq2kk:ydxufx7yxNA:Ha-TFa-wxZw:Ha-TFa-wxZw:ycsFelfskpw:ycsFelfskpw:wcPzTr-BbAA:uawjxcKHkJY:oZeptvEaQwg:oZeptvEaQwg:pipoQkmbEPw:pipoQkmbEPw:sGftP2f-nqo:sGftP2f-nqo:stQSmj5xHPk:stQSmj5xHPk:wA4abGiOigE:RSplw-dOuas:RSplw-dOuas:xzSEjPm_J4Q:woxrN2rrc6Q:3-fNPvlwkKo:KvAoGq21Ksc:KvAoGq21Ksc:QgEROTolbQA:QgEROTolbQA:pqY-rBBytAo:pqY-rBBytAo:jE2txaRhfrs:jE2txaRhfrs:zf-sRhp3wtw:xi-fdglSKwk:xi-fdglSKwk:phA_mGxR4-A:-PhHceAvzJQ:lNqqlaucRso:lNqqlaucRso:YlTr3wglbpk:wOwqd3PlEiA:gdli-TTBElA:gdli-TTBElA:lAaoYTBzFGs:lAaoYTBzFGs:zvbtc31oEnQ:zvbtc31oEnQ:ydP_bOGskbw:ydP_bOGskbw:nboTFkNFqGA:_rSFP_rlS_A:_rSFP_rlS_A:yxoZNb3wHPw:yxoZNb3wHPw:tFnp_0lwo2k:vF5_g0NShYg:wldg-SSIw7s:jQAEOaARj3s:dSBsjQJvwcs:pntwvOdBeno:pntwvOdBeno:axKH2_wwqjA:-piTrbowbYs:-piTrbowbYs:qPvhIyG5EAQ:ikdG0QTlPR0:gnERtvheF2w:s3cBOlHBEAE:s3cBOlHBEAE:t_iJQbFbe7o:GaAiOelrQwA:GaAiOelrQwA:qPgmRcBZyqc:qPgmRcBZyqc:vH3YBFshA1A:vH3YBFshA1A:ozBmSa2lBeo:fRpfuTQAyhI:fRpfuTQAyhI:mAd3etGsySQ:GNa_gaq-2FQ:f2zjujSEPFE:yfmRxiPynNQ:yfmRxiPynNQ:lFng3sdevyo:lFng3sdevyo:Zd-xwwyiuYc:Zd-xwwyiuYc:zqblBq-fUJc:zqblBq-fUJc:w0OPewyNePA:ScvbulGKgdQ:siOxNGAx_TQ:siOxNGAx_TQ:fPja-_dOPPg:ABBp-ikv_GQ:vBxO0mncNQA:fQlPJmHZeYA:fQlPJmHZeYA:Evf3uJNxSTA:bc1kYKAfwhg:bc1kYKAfwhg:yhqKiH4b3hE:targHvzwy5I:hBwFOrndQ2Q:hBwFOrndQ2Q:dNzvA-7ZNws:huH-PzYKOaA:IH2mx1edoEk:waOkpHJc2Pg:waOkpHJc2Pg:K_autmceJFo:yNN-SsfbB4A:yNN-SsfbB4A:FsuvimkuckQ:FsuvimkuckQ:llTOyPxaeoo:llTOyPxaeoo:nhE0ymwciHg:t4Fp2pQwgNg:J_jQtQyPJOE:J_jQtQyPJOE:r_uBHmAhnfo:r_uBHmAhnfo:eiretQENyr4:eiretQENyr4:aefvthRIt7A:aefvthRIt7A:OwbTq_4-jGg:vspaa1GAzbc:vspaa1GAzbc:PjpyfyETHaE:PjpyfyETHaE:xRKgGw0Yf7w:O-1gxufhyio:O-1gxufhyio:xId34mpqxBc:oKq3lhGwzdY:oKq3lhGwzdY:HaenjNBfphc:-xZpxtgg_JI:woQHJO-HQio:woQHJO-HQio:TSyHqgSq_ag:TSyHqgSq_ag:y5NtZN_pbcQ:OfQQvjSHmbg:OfQQvjSHmbg:yFp_BN4mkbY:_NYcqEqyOpk:_qolnm2dA-Y:_qolnm2dA-Y:tutZSvauyhE:tutZSvauyhE:ghgBTOvJhwE:_awtaymTJBQ:_awtaymTJBQ:13TTFhcRwmQ:ttqEsg7qf_w:sak-taOOyYg:sak-taOOyYg:qZwzwmTdedY:qJHtyjTgHYA:qJHtyjTgHYA:AyeeJYx_wHc:AyeeJYx_wHc:-vGlrcayloE:-vGlrcayloE:hvRQyR1Nric:hvRQyR1Nric:whvHz4azNOA:whvHz4azNOA:TdJA3dtmh-A:YRld_AKievg:-ndwmvIwQmo:-ndwmvIwQmo:j0wSohites0:zmPbzgu_Gn4:zmPbzgu_Gn4:pHv3phv3yNA:wpT3w2QWbkw:rqbc4nTivlg:rqbc4nTivlg:mbFkqanETTk:mbFkqanETTk:ctaaN1dJccI:qx_vmZbh8Bg:_kxwbilQIyA:_kxwbilQIyA:xbH1owYAz7A:BmNbZygqHpE:BmNbZygqHpE:v4T2xWgRZGw:lfd_gtrdgGg:lfd_gtrdgGg:1n-to3ahKtA:vaHOFd-KStk:vaHOFd-KStk:xm_-EYgQvlc:xm_-EYgQvlc:rr3bYslx-ec:IqZlim_yoww:IqZlim_yoww:luA4GtJxE20:srScJAs2i1c:srScJAs2i1c:yTg1EPJa1_s:yTg1EPJa1_s:spvbAObyqwo:spvbAObyqwo:mf2keggHpyc:kuAviEmmoP4:kuAviEmmoP4:-sdJ2JdtlGY:zmaRs5Q3gOw:AaGezzEkEag:aFuiJhcff3Q:ozqlcZqtgrg:grefAhSvcvc:grefAhSvcvc:qSeotyOZEZA:qSeotyOZEZA:zfhna4Wuxdc:-scOr4rmGNc:-scOr4rmGNc:qZb_rxOlRs4:qZb_rxOlRs4:ewdeEGoaANI:ewdeEGoaANI:tcl2oe1-pxI:tcl2oe1-pxI:v_QqpeRbc_k:v_QqpeRbc_k:mai_uYRTgxQ:mai_uYRTgxQ:oJ-Be8vJPbA:Rxgf2s-QJYA:Rxgf2s-QJYA:FG1QnwBBP2E:Qhoq_-Hl4gY:Qhoq_-Hl4gY:xHiBtaBuhI4:y8jcgyBpnPo:svb1JvgxAOw:svb1JvgxAOw:vlsSQwsjvEk:vlsSQwsjvEk:KhlBziyisdg:BOoG1FoqynA:BOoG1FoqynA:fOqO2yiqnsc:zQxixvjQBOY:zQxixvjQBOY:lAbStfySPlc:lAbStfySPlc:Q-BcAB3JeGk:xfvGpm-ERQU:wA1K5oRdsvk:pxImOyJq1x4:tArFzilwatw:tArFzilwatw:gycjSHbdwSc:tcpplFkwSok:tcpplFkwSok:kpo_hmKhB3g:wOvY-lq4TBE:wOvY-lq4TBE:wxkYqltzm_A:ckGupKeisQw:ckGupKeisQw:ANeyxntEQxQ:ANeyxntEQxQ:tHmlEylrO1E:xxabxIt2oow:xxabxIt2oow:fl4txxhlpFE:xiuEx5pQkRc:aBmvxiP-PNw:dlmpmtHnnEI:dlmpmtHnnEI:Hh3BAyAjxkw:GwinnRsBQR4:GwinnRsBQR4:ooj4cOBSHaQ:uuwsyqp-wwk:uuwsyqp-wwk:pAkjkG-E4dE:sssqc1Qoknc:Km-us_xvamY:Km-us_xvamY:aAwkEgIQvyo:aAwkEgIQvyo:mdNsjoQ-iO4:FKuObKhqQrA:FKuObKhqQrA:tPAjY_lZzYo:ElanOZfZGsQ:ElanOZfZGsQ:pHiK4sAzeKc:pHiK4sAzeKc:v4wohAa-dPg:v4wohAa-dPg:KKawRlBeftE:kamyxB-yKrc:kamyxB-yKrc:bpnwRGpbhno:bpnwRGpbhno:j_E1_j0dHqk:ZPImchaxn2Q:-jyEahOy4Tg:HyHGATyynmI:HyHGATyynmI:xPA5juzIEZs:aHOmfbngyBs:aHOmfbngyBs:G3E1AjGw_Pc:G3E1AjGw_Pc:FEclp1gba1E:FEclp1gba1E:-1eKoQGjjhE:sugfhgIkwac:sugfhgIkwac:nxOjtihOl-s:ccNbsxeetdc:jqvFxJEJbtg:jqvFxJEJbtg:wbR4fJ_e_vw:QdGBr3yzagg:aJpljm-mziY:aJpljm-mziY:wHv_af-ScFw:xzBGEAdG-Tg:xzBGEAdG-Tg:rztcb-sbEE4:nilQjgsEGN4:qBOHvRQ3orE:qBOHvRQ3orE:uKnoo-s1c2I:wQWygif5dck:wQWygif5dck:iQA0sfA3ZEc:I1sfslgQ_mw:I1sfslgQ_mw:IwJbb0tQq7s:wune-PzwoQg:wune-PzwoQg:jOdkbOPiqsE:4jgoAfPWFzo:wrNAF5pbFNc:wrNAF5pbFNc:eEoSwgeBqhY:eEoSwgeBqhY:IqwzZwTyeyo:wfnEO1E2hsU:FokvtHumQag:FokvtHumQag:cSZFdJfT-so:cSZFdJfT-so:uQRS-Jqp0oA:pkbkTTtmhhw:pkbkTTtmhhw:u_HcNlmOSwg:u_HcNlmOSwg:draqd3ETFPE:SRjg_Aaq3bg:FzbQh-d4Tto:vqkcyp_tI-A:vqkcyp_tI-A:OwJngGTwn2o:p4qEHZlzHog:p4qEHZlzHog:ngOaItfq-6k:Ee-QEJndBJE:Ee-QEJndBJE:wZohsGGmtEk:wZohsGGmtEk:G3GEJpvkEmc:wcTxGTwceJo:wcTxGTwceJo:qbSJzHQYols:k4pZg-Q_PHc:f1hqHvR3FdE:xrbuhOuTKFk:xrbuhOuTKFk:lrpmEejhTAw:HkthxdutBnA:um3_QAQcwP4:laaQdZbsGZE:laaQdZbsGZE:glZYGy2ouSE:glZYGy2ouSE:yEi3aKJdeO0:yEi3aKJdeO0:pbsnuJq1Wq4:pbsnuJq1Wq4:YshJBTypvEA:beKfByBlAhQ:beKfByBlAhQ:hfhY_BwB7fs:QihseRRApI4:QihseRRApI4:y8nhcmwyoqQ:q3dqiRpGgGs:q3dqiRpGgGs:j1tbcogawSQ:yq0pt_Y_frk:zGgwahbqahU:zGgwahbqahU:ggRPnFuu-Qs:ggRPnFuu-Qs:_QhqbbmP4uc:_QhqbbmP4uc:ngf2GoEFJPE:ngf2GoEFJPE:uG_tQKQbjAY:uG_tQKQbjAY:wHJmcFvEnTA:NTocsiSFfys:NTocsiSFfys:-J_ihyPlOxw:rexKPqsy5vQ:JmhZfYJSuqs:ncmiFPhxiro:mauh_YQKhgE:mauh_YQKhgE:pj-B-SbpJiA:pj-B-SbpJiA:QyaGi1wYQgc:QyaGi1wYQgc:Nihjfvmx_so:_jaqSimTYjk:uJTG2OQOl-w:uJTG2OQOl-w:nvu_IgvoGE4:xfp_n5Tyryw:lTPPipSAenw:lTPPipSAenw:rrNat-3H-Ew:rrNat-3H-Ew:hTj2SGPkKtg:kx_larKYpAQ:kx_larKYpAQ:slauSOa5-Qw:2v-_TGTklFQ:2v-_TGTklFQ:hnTGzYgumaI:tchOzeivZo0:lPlR-_ocdTQ:wAxyheoixmc:wAxyheoixmc:wPp7jbuJOHo:wKq2kbqtf3A:HFtTSPjpj_c:HFtTSPjpj_c:wFvzs2P1hHQ:wFvzs2P1hHQ:ZebJ2PE1ztg:T_BtuitQh_w:T_BtuitQh_w:ry4Kkuxx4F0:YduEfbzpdOQ:YduEfbzpdOQ:dqdRKFgoPfc:dqdRKFgoPfc:bHmAqtibTiI:ouYqANH8hlA:y7UZHEHhdek:RopkEy-EycA:RopkEy-EycA:qBw1hEEqZS0:xmg5axAQiyw:xmg5axAQiyw:plUsAQuaBZ0:plUsAQuaBZ0:hcB-w_3FHxQ:hcB-w_3FHxQ:Bs1HxF2zuzk:bnNI-cdxirQ:ppAPdFagHzE:ppAPdFagHzE:aZgdFncg1ss:wfNJmNGcsEQ:wfNJmNGcsEQ:lucajYNfFc8:B6AQhpFkgfQ:q4tGzHNuONQ:q4tGzHNuONQ:sKrdk4xwdBo:sKrdk4xwdBo:fx1do3YRPsE:fx1do3YRPsE:eFnlOA8-jdA:OtA4AEl_KJk:OtA4AEl_KJk:u1AjQxdb3Hc:u1AjQxdb3Hc:dQKotAHphKE:dQKotAHphKE:fQQJr-tEaJE:ln0ff5dZe0c:wx3wr2ZrSYA:wx3wr2ZrSYA:vQRiJthf6a0:yw7AfY0fihA:yw7AfY0fihA:xj3b3_Gpius:wiGjv-aOlhE:wiGjv-aOlhE:IAfz1PcxAyo:bdAxwEApy_Q:bdAxwEApy_Q:yuoq_YeIBxc:rTaE_HS_2ik:NP-bZmvOzhA:NP-bZmvOzhA:PBqjFihluag:PBqjFihluag:zNdQy3yyBgQ:ougEbiPYG2c:yn2bGA-nZAA:yn2bGA-nZAA:qqsZ_J3fm-A:Zf0lOv_ZIn4:ZAgZv10jIbo:gOqe2olOSuc:gOqe2olOSuc:ciZ0v8rGabo:ciZ0v8rGabo:xgwc4fsipJs:xgwc4fsipJs:k3Odpd3EFAE:FS6cFHTI1uk:FS6cFHTI1uk:zOh06yNeboc:zOh06yNeboc:O-RRxsorbPg:ladYOoihTHk:ladYOoihTHk:IBElwAz3O5s:kS2sGozZxZc:PpzFEyFxtoo:PpzFEyFxtoo:rxTt2yY31cs:wZmc7Egwfpc:wZmc7Egwfpc:YhBwhuqFqjw:YhBwhuqFqjw:hRp2iaks_fg:peGgwq7uJ_U:idhgcpHBvuo:idhgcpHBvuo:dfYKdPPxG_o:NNmy-vuwxrc:NNmy-vuwxrc:OEo_ug8EQbU:SfkphhQtEys:SfkphhQtEys:vwrTyHPe2QE:geFJKtFisPA:geFJKtFisPA:zowrvPh6xcs:ukbiPBR2-GI:hW-ynfpmcj4:hW-ynfpmcj4:HArS1HmjruQ:HArS1HmjruQ:ediic2HnGco:ediic2HnGco:qQiwgEQNfQs:qQiwgEQNfQs:GGGrmu_cYto:yZiWeGlNHug:GZFuHnwGZNc:GZFuHnwGZNc:swiSjPF_ii4:yn_lOfckS4o:yn_lOfckS4o:snNs6Weqtzw:IlppNGAeafE:nn_OOeNcPnw:nn_OOeNcPnw:4dK-BcpcnGw:a3FJiyeRrew:a3FJiyeRrew:H4_TtauZHaw:4kT-Ggvygc0:nGEO_aozx8w:nGEO_aozx8w:vgmYHte2Grs:vgmYHte2Grs:PsyZzsKcvic:PsyZzsKcvic:AiOzg_qNuT4:AiOzg_qNuT4:oOBPSkdqZZo:oOBPSkdqZZo:HO_uATipTtg:iA_liuSEKwk:iA_liuSEKwk:AbBF-faYffc:vzZH-OoHuyo:vzZH-OoHuyo:mir7GitnpuE:swcjch2KKIo:swcjch2KKIo:f-2EezHkGOs:f-2EezHkGOs:hPGtjxFKc50:quk0P8dl_OY:hNmFAeHOeBE:hNmFAeHOeBE:mvlwbkW-p0A:jsEhj-cjrPE:jsEhj-cjrPE:qtaQjlsquwc:qtaQjlsquwc";
    a = a.split(":");
    return "youtu.be/" + a[min * 60 + sec + (state.youtubeDiff ?? 0) - 180];
}
function sacrifice(password) {
    // FIXME you need to remember this
    let letters = [...document.querySelectorAll("button.letter")];
    let wegdamit = document.querySelector(".sacrafice-btn");
    let used = [
        ...new Set([...password.toUpperCase().replace(/[^A-Z]*/g, "")]),
    ];

    let kick = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        .split("")
        .filter((x) => !used.includes(x))
        .slice(-2);

    setTimeout(() => {
        let index = kick[0].charCodeAt(0) - "A".charCodeAt(0);
        letters[index].click();
    }, 10);
    setTimeout(() => {
        let index = kick[1].charCodeAt(0) - "A".charCodeAt(0);
        letters[index].click();
    }, 20);
    setTimeout(() => wegdamit.click(), 30);
    return "";
}
function hexColor() {
    let col = document.querySelector(".rand-color");

    let bg = col.style.background; // 'rgb(11, 218, 5)'
    let rgb =
        "#" +
        bg
            .replace(/[^0-9,]/g, "")
            .split(",")
            .map(Number)
            .map((x) => x.toString(16).padStart(2, 0))
            .join("");
    let sum = [...rgb]
        .filter((x) => /[1-9]/.test(x))
        .map(Number)
        .reduce((sum, x) => sum, 0);
    if (sum > 5) {
        document.querySelector(".refresh").click();
        state.update();
    }

    return rgb;
}
function fill(password) {
    const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
    const charCount = Array.from(segmenter.segment(password)).length;
    const hexagrams =
        "䷀䷁䷂䷃䷄䷅䷆䷇䷈䷉䷊䷋䷌䷍䷎䷏䷐䷑䷒䷓䷔䷕䷖䷗䷘䷙䷚䷛䷜䷝䷞䷟䷠䷡䷢䷣䷤䷥䷦䷧䷨䷩䷪䷫䷬䷭䷮䷯䷰䷱䷲䷳䷴䷵䷶䷷䷸䷹䷺䷻䷼䷽䷾䷿";
    return hexagrams.slice(0, 101 - charCount);
}
function format(password) {
    const letters = Array.from(password);
    const sizes = [0, 1, 4, 9, 12, 16, 25, 28, 32, 36, 42, 49, 64, 81];
    const letterindex = {};
    let formated = "";
    letters.forEach((letter, index) => {
        let style = "";
        if (letter.match(/[aeiouy]/i)) {
            style += "font-weight: bold;";
        } else if (state.level >= 30 && letter.match(/[0-9]/)) {
            style += `font-size: ${Number(letter) ** 2}px;`;
        }
        if (state.level >= 28 && letter.match(/[XVI]/i)) {
            style += "font-family: Times New Roman;";
        } else if (state.level >= 27 && letter.match(/[a-zA-Z]/)) {
            style += "font-family: Wingdings;";
        }
        if (state.level >= 31 && !letter.match(/[0-9]/)) {
            let x = letter.toLowerCase();
            if (letterindex[x]) {
                letterindex[x]++;
            } else {
                letterindex[x] = 1;
            }
            style += `font-size: ${sizes[letterindex[x]]}px;`;
        }

        if (state.level >= 26 && letter.match(/[a-z]/i)) {
            style += "font-style: italic;";
        }

        formated += `<span style="${style}">${letter}</span>`;
    });
    return formated;
}
// helpers

async function fetchChess() {
    if (state.fetchingChess || !window?.Chess) return;
    state.fetchingChess = true;
    const chessElement = document.querySelector(".chess-img");
    const color = document
        .querySelector(".move")
        ?.innerHTML.trim()[0]
        .toLowerCase();
    let response = await fetch(chessElement.src);
    const svg = await response.text();
    const fen =
        svg
            .split(/<\/?pre>/)[1]
            .trim()
            .replace(/ /g, "")
            .replace(/\.+/g, (x) => x.length)
            .replace(/\n/g, "/") +
        " " +
        color +
        " - - 0 1";
    const url = `https://lichess.org/api/cloud-eval?fen=${encodeURIComponent(
        fen
    )}`;
    response = await fetch(url);
    const data = await response.json();
    bestMove = data.pvs[0].moves;
    const engine = new Chess(fen);
    const move = engine.move({
        from: bestMove.slice(0, 2),
        to: bestMove.slice(2, 4),
    });
    state.chess = move.san;
    state.fetchingChess = false;
}

function debounce(func, delay = 1000) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
}
function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}
function hhmm() {
    // original code from neal.fun
    const time = new Date()
        .toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: !0,
        })
        .split(" ")[0];

    return time;
}
