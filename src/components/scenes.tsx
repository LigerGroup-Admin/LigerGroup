/*
  The Liger Poster Series — authored silkscreen scenes.
  Flat inks only; each scene uses its brand's four inks plus cream stock
  and at most two mixed shades of the same inks. Layered groups carry
  data-depth for the PosterScene parallax (0 fixed → 1 fastest).
  preserveAspectRatio anchors the horizon so phones crop outside-in.
*/

type SceneProps = { className?: string };

/* ------------------------------------------------------------------ */
/* LigerRemote — dawn over the Lagos lagoon                            */
/* ------------------------------------------------------------------ */

const remoteSkyline = [
  // x, width, height above horizon (y=500)
  [40, 34, 60], [86, 26, 96], [124, 40, 74], [176, 30, 128], [216, 22, 92],
  [250, 44, 66], [306, 28, 148], [346, 36, 108], [394, 24, 82], [430, 46, 60],
  [910, 30, 72], [952, 26, 118], [990, 42, 88], [1044, 30, 154], [1086, 24, 96],
  [1122, 40, 70], [1174, 28, 132], [1214, 34, 100], [1260, 26, 78], [1298, 44, 58],
  [1354, 30, 90],
] as const;

export function RemoteScene({ className }: SceneProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 810"
      preserveAspectRatio="xMidYMax slice"
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      {/* Sky swath — unbroken cobalt */}
      <g data-depth="0.12">
        <rect x="0" y="0" width="1440" height="548" fill="#1f4d92" />
        {/* Dawn sun with silkscreen rings — clear of the headline column */}
        <circle cx="870" cy="420" r="126" fill="none" stroke="#f4edda" strokeWidth="3" opacity="0.28" />
        <circle cx="870" cy="420" r="104" fill="none" stroke="#e39b2d" strokeWidth="4" opacity="0.5" />
        <circle cx="870" cy="420" r="84" fill="#e39b2d" />
        <circle cx="870" cy="420" r="84" fill="none" stroke="#f4edda" strokeWidth="3" opacity="0.55" />
      </g>

      {/* Clouds — cream stock showing through */}
      <g data-depth="0.26" fill="#f4edda">
        <g opacity="0.92">
          <rect x="120" y="150" width="250" height="26" rx="13" />
          <rect x="170" y="124" width="150" height="26" rx="13" />
          <rect x="80" y="176" width="180" height="22" rx="11" />
        </g>
        <g opacity="0.8">
          <rect x="1120" y="120" width="220" height="24" rx="12" />
          <rect x="1180" y="96" width="120" height="24" rx="12" />
        </g>
        <g opacity="0.7">
          <rect x="620" y="210" width="170" height="20" rx="10" />
          <rect x="662" y="190" width="90" height="20" rx="10" />
        </g>
      </g>

      {/* Far skyline across the lagoon */}
      <g data-depth="0.4" fill="#16386b">
        <rect x="0" y="498" width="1440" height="12" />
        {remoteSkyline.map(([x, w, h]) => (
          <rect key={`${x}`} x={x} y={500 - h} width={w} height={h + 4} />
        ))}
        {/* Antenna masts */}
        <rect x="188" y="332" width="4" height="42" />
        <rect x="1056" y="306" width="4" height="42" />
      </g>

      {/* Third Mainland Bridge */}
      <g data-depth="0.55">
        <rect x="0" y="512" width="1440" height="12" fill="#122840" />
        {Array.from({ length: 17 }, (_, i) => (
          <rect key={i} x={20 + i * 88} y="522" width="9" height="34" fill="#122840" />
        ))}
        <rect x="0" y="508" width="1440" height="3" fill="#f4edda" opacity="0.35" />
      </g>

      {/* Lagoon water */}
      <g data-depth="0.62">
        <rect x="0" y="540" width="1440" height="270" fill="#175e57" />
        {/* Sun path on the water */}
        <g fill="#e39b2d">
          <rect x="906" y="576" width="88" height="7" />
          <rect x="922" y="602" width="56" height="6" />
          <rect x="898" y="630" width="104" height="6" />
          <rect x="930" y="660" width="40" height="5" />
        </g>
        <g fill="#f4edda" opacity="0.4">
          <rect x="120" y="592" width="90" height="5" />
          <rect x="330" y="640" width="120" height="5" />
          <rect x="620" y="600" width="70" height="5" />
          <rect x="1180" y="618" width="110" height="5" />
          <rect x="1300" y="676" width="80" height="5" />
          <rect x="500" y="688" width="100" height="5" />
        </g>
        {/* Fishing canoe */}
        <g fill="#122840">
          <path d="M1080 604 q40 18 92 0 l-10 14 q-36 10 -72 0 Z" />
          <rect x="1120" y="568" width="5" height="38" />
        </g>
      </g>

      {/* Foreground headland with palms */}
      <g data-depth="0.85" fill="#122840">
        <path d="M0 660 q140 -28 280 -6 q160 24 280 60 q90 28 160 96 L0 810 Z" />
        {/* Palm one */}
        <path d="M176 648 q-6 -70 18 -122 l14 4 q-22 52 -14 118 Z" />
        <path d="M196 532 q-44 -28 -92 -20 q46 -14 96 6 q6 -34 -18 -62 q30 20 32 58 q34 -30 76 -28 q-40 8 -66 40 q42 -6 74 18 q-42 -12 -84 2 Z" />
        {/* Palm two */}
        <path d="M312 682 q-4 -58 14 -100 l12 4 q-16 42 -10 96 Z" />
        <path d="M330 586 q-36 -22 -74 -16 q38 -12 78 4 q4 -28 -14 -50 q24 16 26 46 q28 -24 62 -22 q-32 6 -54 32 q34 -4 60 14 q-34 -10 -68 2 Z" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* LigerForce — the workshop skyline, cranes and kilns                 */
/* ------------------------------------------------------------------ */

export function ForceScene({ className }: SceneProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 810"
      preserveAspectRatio="xMidYMax slice"
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      {/* Sky swath — unbroken railway green */}
      <g data-depth="0.12">
        <rect x="0" y="0" width="1440" height="560" fill="#2f5241" />
        <circle cx="820" cy="404" r="100" fill="none" stroke="#f4edda" strokeWidth="3" opacity="0.25" />
        <circle cx="820" cy="404" r="72" fill="#c98e3f" />
        <circle cx="820" cy="404" r="72" fill="none" stroke="#f4edda" strokeWidth="3" opacity="0.5" />
      </g>

      {/* Smoke and cloud banks */}
      <g data-depth="0.26" fill="#f4edda">
        <g opacity="0.85">
          <rect x="880" y="150" width="240" height="24" rx="12" />
          <rect x="940" y="126" width="130" height="24" rx="12" />
        </g>
        <g opacity="0.65">
          <rect x="150" y="330" width="170" height="20" rx="10" />
          <rect x="196" y="310" width="90" height="20" rx="10" />
        </g>
        {/* Chimney smoke puffs */}
        <g opacity="0.9">
          <circle cx="1046" cy="330" r="16" />
          <circle cx="1068" cy="306" r="13" />
          <circle cx="1092" cy="288" r="10" />
        </g>
      </g>

      {/* Far factory row */}
      <g data-depth="0.42" fill="#26443a">
        <rect x="0" y="556" width="1440" height="10" />
        {/* Sawtooth sheds */}
        <path d="M40 558 v-64 l52 -30 v30 l52 -30 v30 l52 -30 v94 Z" />
        <path d="M620 558 v-54 l46 -26 v26 l46 -26 v26 l46 -26 v80 Z" />
        <rect x="270" y="452" width="54" height="108" />
        <rect x="840" y="470" width="70" height="90" />
        <rect x="1250" y="440" width="44" height="120" />
        <rect x="1320" y="486" width="80" height="74" />
      </g>

      {/* Near works — chimneys, kiln, gantry crane */}
      <g data-depth="0.6">
        <rect x="0" y="556" width="1440" height="96" fill="#274538" />
        <rect x="0" y="640" width="1440" height="170" fill="#1f2b26" />
        {/* Long shed — set right of the headline column */}
        <path d="M640 642 v-90 l68 -38 v38 l68 -38 v38 l68 -38 v128 Z" fill="#1f2b26" />
        {/* Brick chimney stack pair */}
        <g>
          <rect x="1030" y="352" width="34" height="292" fill="#b5482f" />
          <rect x="1024" y="352" width="46" height="14" fill="#1f2b26" />
          <rect x="1094" y="420" width="28" height="224" fill="#b5482f" />
          <rect x="1089" y="420" width="38" height="12" fill="#1f2b26" />
        </g>
        {/* Bottle kiln */}
        <path d="M520 644 q0 -120 44 -150 q44 30 44 150 Z" fill="#1f2b26" />
        <rect x="556" y="470" width="16" height="40" fill="#1f2b26" />
        {/* Tower crane */}
        <g fill="#1f2b26">
          <rect x="1240" y="360" width="14" height="284" />
          <rect x="1244" y="318" width="7" height="46" />
          <rect x="1150" y="356" width="270" height="10" />
          <path d="M1247 322 L1402 358 L1400 366 L1246 330 Z" />
          <path d="M1248 322 L1162 356 L1165 364 L1249 330 Z" />
          <rect x="1150" y="366" width="30" height="24" />
          <rect x="1378" y="366" width="5" height="52" />
          <rect x="1364" y="418" width="30" height="26" fill="#c98e3f" />
        </g>
        {/* Lit windows on the near shed */}
        <g fill="#c98e3f">
          <rect x="666" y="580" width="26" height="34" />
          <rect x="708" y="580" width="26" height="34" />
          <rect x="750" y="580" width="26" height="34" />
          <rect x="792" y="580" width="26" height="34" />
        </g>
      </g>

      {/* Foreground terrace rooftops */}
      <g data-depth="0.85" fill="#141d1a">
        <path d="M0 810 v-96 l90 -44 l90 44 l90 -44 l90 44 l90 -44 l90 44 v96 Z" />
        <path d="M900 810 v-80 l86 -40 l86 40 l86 -40 l86 40 l86 -40 l86 40 v80 Z" />
        <g fill="#b5482f">
          <rect x="120" y="646" width="18" height="34" />
          <rect x="392" y="646" width="18" height="34" />
          <rect x="1022" y="672" width="16" height="30" />
          <rect x="1290" y="672" width="16" height="30" />
        </g>
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* LigerLearn — the summit range at dusk                               */
/* ------------------------------------------------------------------ */

export function LearnScene({ className }: SceneProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 810"
      preserveAspectRatio="xMidYMax slice"
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      {/* Dusk sky */}
      <g data-depth="0.12">
        <rect x="0" y="0" width="1440" height="810" fill="#432b4e" />
        <circle cx="860" cy="410" r="110" fill="none" stroke="#f4edda" strokeWidth="3" opacity="0.22" />
        <circle cx="860" cy="410" r="82" fill="#b98a3c" />
        <circle cx="860" cy="410" r="82" fill="none" stroke="#f4edda" strokeWidth="3" opacity="0.5" />
        {/* First stars */}
        <g fill="#f4edda" opacity="0.75">
          <circle cx="150" cy="120" r="3" />
          <circle cx="300" cy="80" r="2.4" />
          <circle cx="900" cy="90" r="2.6" />
          <circle cx="1120" cy="150" r="3" />
          <circle cx="1310" cy="70" r="2.4" />
          <circle cx="1250" cy="240" r="2.6" />
        </g>
      </g>

      {/* Dusk cloud bands */}
      <g data-depth="0.26" fill="#f4edda">
        <rect x="220" y="330" width="300" height="18" rx="9" opacity="0.5" />
        <rect x="290" y="352" width="180" height="14" rx="7" opacity="0.35" />
        <rect x="1010" y="300" width="260" height="18" rx="9" opacity="0.45" />
      </g>

      {/* Far range */}
      <g data-depth="0.42" fill="#59395f">
        <path d="M0 560 l150 -110 l120 84 l160 -140 l140 108 l130 -90 l150 116 l130 -96 l150 112 l120 -78 l190 128 v116 H0 Z" />
      </g>

      {/* Mid range — oxblood peaks with brass light on the faces */}
      <g data-depth="0.6">
        <path d="M0 640 l190 -160 l160 120 l200 -190 l210 168 l180 -140 l220 176 l160 -120 l120 90 v226 H0 Z" fill="#6e2639" />
        {/* Sunlit western faces — each wedge follows its peak's sun-side slope */}
        <path d="M550 410 L475 481 L550 481 Z" fill="#b98a3c" opacity="0.85" />
        <path d="M940 438 L868 494 L940 494 Z" fill="#b98a3c" opacity="0.7" />
        <path d="M1320 494 L1256 542 L1320 542 Z" fill="#b98a3c" opacity="0.6" />
      </g>

      {/* Near ridge with switchback path to the summit cairn */}
      <g data-depth="0.85">
        <path d="M0 810 v-150 l260 -120 l240 96 l250 -140 l260 120 l230 -90 l200 84 v200 Z" fill="#2a1730" />
        {/* Switchback trail — cream dashes climbing to the cairn */}
        <g fill="#f4edda" opacity="0.85">
          <rect x="1080" y="756" width="70" height="6" transform="rotate(-8 1080 756)" />
          <rect x="960" y="726" width="80" height="6" transform="rotate(6 960 726)" />
          <rect x="880" y="690" width="66" height="6" transform="rotate(-10 880 690)" />
          <rect x="800" y="652" width="58" height="5" transform="rotate(7 800 652)" />
          <rect x="762" y="612" width="44" height="5" transform="rotate(-12 762 612)" />
          <rect x="742" y="574" width="30" height="5" transform="rotate(9 742 574)" />
        </g>
        {/* Summit cairn and pennant */}
        <g>
          <path d="M736 540 l14 -26 l14 26 Z" fill="#f4edda" />
          <rect x="748" y="492" width="4" height="30" fill="#f4edda" />
          <path d="M752 492 l26 8 l-26 8 Z" fill="#b98a3c" />
        </g>
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Liger Group — the city at night, one skyline                        */
/* ------------------------------------------------------------------ */

const groupSkyline = [
  [500, 40, 120], [552, 30, 190], [594, 46, 150], [652, 34, 230], [698, 26, 170],
  [736, 48, 130], [796, 32, 210], [840, 40, 164], [892, 28, 120], [932, 50, 96],
  [994, 34, 180], [1040, 26, 140],
] as const;

export function GroupScene({ className }: SceneProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 810"
      preserveAspectRatio="xMidYMax slice"
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      {/* Night sky */}
      <g data-depth="0.12">
        <rect x="0" y="0" width="1440" height="810" fill="#1c2b52" />
        <circle cx="1190" cy="330" r="100" fill="none" stroke="#f4edda" strokeWidth="3" opacity="0.2" />
        <circle cx="1190" cy="330" r="68" fill="#d3a04a" />
        <circle cx="1190" cy="330" r="68" fill="none" stroke="#f4edda" strokeWidth="3" opacity="0.5" />
        <g fill="#f4edda">
          <circle cx="120" cy="140" r="3" />
          <circle cx="260" cy="70" r="2.4" />
          <circle cx="420" cy="180" r="2.6" />
          <circle cx="640" cy="90" r="3" />
          <circle cx="820" cy="160" r="2.2" />
          <circle cx="980" cy="60" r="2.6" />
          <circle cx="1300" cy="120" r="2.4" />
          <circle cx="1390" cy="260" r="2.8" />
          <circle cx="200" cy="300" r="2.2" />
          <circle cx="1240" cy="330" r="2.2" />
        </g>
      </g>

      {/* National Theatre saddle + mid skyline in slate */}
      <g data-depth="0.4" fill="#5a7191">
        <path d="M150 560 q30 -90 130 -96 q100 6 130 96 q-40 -34 -130 -36 q-90 2 -130 36 Z" />
        <rect x="0" y="556" width="1440" height="10" />
        <rect x="70" y="480" width="36" height="80" />
        <rect x="452" y="470" width="30" height="90" />
        <rect x="1130" y="470" width="40" height="90" />
        <rect x="1210" y="500" width="60" height="60" />
        <rect x="1330" y="450" width="34" height="110" />
      </g>

      {/* Main skyline in deep ink with scattered gold windows */}
      <g data-depth="0.6">
        <g fill="#0d152b">
          {groupSkyline.map(([x, w, h]) => (
            <rect key={`${x}`} x={x} y={566 - h} width={w} height={h + 6} />
          ))}
          <rect x="668" y="306" width="4" height="34" />
          <rect x="810" y="326" width="4" height="34" />
        </g>
        <g fill="#d3a04a">
          <rect x="560" y="420" width="8" height="10" />
          <rect x="574" y="456" width="8" height="10" />
          <rect x="660" y="380" width="8" height="10" />
          <rect x="674" y="420" width="8" height="10" />
          <rect x="804" y="400" width="8" height="10" />
          <rect x="818" y="440" width="8" height="10" />
          <rect x="1002" y="430" width="8" height="10" />
          <rect x="936" y="490" width="8" height="10" />
          <rect x="610" y="500" width="8" height="10" />
          <rect x="850" y="500" width="8" height="10" />
        </g>
      </g>

      {/* Harbour water with moon reflection */}
      <g data-depth="0.85">
        <rect x="0" y="572" width="1440" height="238" fill="#091021" />
        <g fill="#d3a04a">
          <rect x="1148" y="606" width="84" height="6" />
          <rect x="1166" y="632" width="48" height="5" />
          <rect x="1140" y="660" width="100" height="5" />
          <rect x="1172" y="692" width="36" height="4" />
        </g>
        <g fill="#f4edda" opacity="0.3">
          <rect x="200" y="620" width="90" height="4" />
          <rect x="420" y="660" width="120" height="4" />
          <rect x="700" y="632" width="80" height="4" />
          <rect x="330" y="700" width="70" height="4" />
        </g>
      </g>
    </svg>
  );
}
