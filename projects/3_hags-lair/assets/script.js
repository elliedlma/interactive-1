const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

const W = 1200;
const H = 900;
canvas.width = W;
canvas.height = H;

const DEBUG = false;

// ============================================================
//  ROOMS
// ============================================================
const ROOMS = {
  // --- UI / Title screens ---
  control_page: {
    type: "ui",
    mapSrc: "maps/Control_page.png",
    next: "start_page_sign",
    advanceKey: " ",
    promptText: "Press SPACE to continue",
  },
  start_page_sign: {
    type: "ui",
    mapSrc: "maps/Start_Page_Sign.png",
    next: "start_page",
    promptText: "Press any key to continue",
  },
  start_page: {
    type: "ui",
    mapSrc: "maps/Start_Page.png",
    next: "character_selection",
    promptText: "Press any key to start",
  },
  character_selection: {
    type: "character_select",
    mapSrc: "maps/Character_selection.png",
    next: "cottage",
  },

  // --- Game rooms ---
  cottage: {
    type: "game",
    mapSrc: "maps/cottage.png",
    spawnX: 600,
    spawnY: 450,
    polygon: [
      { x: 318, y: 135 },
      { x: 929, y: 136 },
      { x: 962, y: 181 },
      { x: 992, y: 210 },
      { x: 1024, y: 257 },
      { x: 1057, y: 286 },
      { x: 1088, y: 375 },
      { x: 1089, y: 554 },
      { x: 1072, y: 673 },
      { x: 1044, y: 750 },
      { x: 1005, y: 794 },
      { x: 973, y: 920 },
      { x: 276, y: 920 },
      { x: 243, y: 798 },
      { x: 209, y: 748 },
      { x: 178, y: 658 },
      { x: 162, y: 378 },
      { x: 196, y: 301 },
      { x: 227, y: 271 },
      { x: 259, y: 224 },
      { x: 291, y: 181 },
    ],
  },

  hallway_dungeon: {
    type: "game",
    mapSrc: "maps/Hallway_to_Dungeon.png",
    spawnX: 620,
    spawnY: 550,
    polygon: [
      { x: 368, y: 126 },
      { x: 873, y: 121 },
      { x: 872, y: 772 },
      { x: 370, y: 771 },
    ],
  },

  hexed: {
    type: "game",
    mapSrc: "maps/Hexed_victims.png",
    spawnX: 620,
    spawnY: 740,
    polygon: [
      { x: 357, y: 151 },
      { x: 877, y: 151 },
      { x: 925, y: 194 },
      { x: 959, y: 254 },
      { x: 991, y: 284 },
      { x: 1024, y: 316 },
      { x: 1020, y: 743 },
      { x: 986, y: 776 },
      { x: 955, y: 806 },
      { x: 926, y: 834 },
      { x: 304, y: 837 },
      { x: 280, y: 802 },
      { x: 241, y: 777 },
      { x: 216, y: 746 },
      { x: 211, y: 320 },
      { x: 241, y: 284 },
      { x: 277, y: 254 },
      { x: 306, y: 194 },
    ],
  },

  magic_tree: {
    type: "dice",
    mapSrc: "maps/magic_tree.png",
    next: "hallway_battle",
    dc: 7,
    dialogue: [
      "Who are you, adventurer?",
      "Are you worthy to venture forth and defeat the hag?",
    ],
  },

  hallway_battle: {
    type: "game",
    mapSrc: "maps/hallway_battle_area.png",
    spawnX: 613,
    spawnY: 670,
    polygon: [
      { x: 291, y: 125 },
      { x: 959, y: 121 },
      { x: 956, y: 766 },
      { x: 270, y: 774 },
    ],
  },

  battle_01: {
    type: "game",
    mapSrc: "maps/battle_area_01.png",
    spawnX: 620,
    spawnY: 700,
    polygon: [
      { x: 272, y: 120 },
      { x: 970, y: 125 },
      { x: 1021, y: 169 },
      { x: 1135, y: 194 },
      { x: 1133, y: 758 },
      { x: 1023, y: 777 },
      { x: 972, y: 820 },
      { x: 277, y: 821 },
      { x: 229, y: 784 },
      { x: 116, y: 758 },
      { x: 112, y: 180 },
      { x: 228, y: 150 },
    ],
  },

  loot_room: {
    type: "game",
    mapSrc: "maps/loot_room.png",
    spawnX: 620,
    spawnY: 550,
    polygon: [
      { x: 355, y: 241 },
      { x: 892, y: 244 },
      { x: 931, y: 271 },
      { x: 940, y: 286 },
      { x: 942, y: 656 },
      { x: 929, y: 671 },
      { x: 894, y: 700 },
      { x: 354, y: 700 },
      { x: 337, y: 687 },
      { x: 308, y: 658 },
      { x: 305, y: 282 },
      { x: 324, y: 270 },
    ],
  },

  final_battle: {
    type: "game",
    mapSrc: "maps/final_battle_area.png",
    spawnX: 468,
    spawnY: 182,
    polygon: [
      { x: 273, y: 92 },
      { x: 924, y: 90 },
      { x: 951, y: 125 },
      { x: 984, y: 154 },
      { x: 1050, y: 217 },
      { x: 1082, y: 246 },
      { x: 1084, y: 670 },
      { x: 1052, y: 700 },
      { x: 1023, y: 731 },
      { x: 990, y: 763 },
      { x: 957, y: 787 },
      { x: 226, y: 790 },
      { x: 198, y: 758 },
      { x: 181, y: 727 },
      { x: 148, y: 704 },
      { x: 115, y: 674 },
      { x: 116, y: 242 },
      { x: 148, y: 215 },
      { x: 184, y: 184 },
      { x: 212, y: 152 },
      { x: 243, y: 118 },
    ],
  },

  cliff_exit: {
    type: "game",
    mapSrc: "maps/cliff_exit.png",
    spawnX: 253,
    spawnY: 333,
    polygon: [
      { x: 233, y: 175 },
      { x: 956, y: 174 },
      { x: 957, y: 487 },
      { x: 231, y: 493 },
    ],
  },

  // --- Ending screens ---
  good_ending: {
    type: "ui",
    mapSrc: "maps/good_ending.png",
    next: "control_page",
    promptText: "Press any key to return to the beginning",
  },
  bad_ending: {
    type: "ui",
    mapSrc: "maps/bad_ending.png",
    next: "control_page",
    promptText: "Press any key to return to the beginning",
  },
};

// ============================================================
//  TRIGGERS
// ============================================================
const TRIGGERS = {
  cottage: [
    // Magic mirror → hallway to dungeon
    {
      x: 950,
      y: 380,
      w: 140,
      h: 280,
      to: "hallway_dungeon",
      condition: () => gameState.bookRead,
      onBlocked: () =>
        showMessage(
          "Something holds you back... perhaps there is more to learn here first.",
        ),
    },
    // Front door → good or bad ending
    {
      x: 571,
      y: 810,
      w: 222,
      h: 40,
      get to() {
        return gameState.childSaved ? "good_ending" : "bad_ending";
      },
      condition: () => gameState.gameCompleted,
      onBlocked: () =>
        showMessage("You cannot leave yet. Auntie Ethel must be stopped!", 300),
    },
  ],
  hallway_dungeon: [
    { x: 368, y: 250, w: 505, h: 100, to: "hexed" },

    { x: 368, y: 700, w: 505, h: 80, to: "cottage" },
  ],
  hexed: [
    // Magic tree — walk into it to trigger the dice roll screen
    {
      x: 490,
      y: 120,
      w: 200,
      h: 150,
      to: "magic_tree",
      onEnter: () => resetDice(),
      condition: () => !gameState.treeCleared,
    },

    // Bottom of map → back to hallway dungeon
    { x: 304, y: 775, w: 622, h: 70, to: "hallway_dungeon" },
  ],

  // hexed → magic_tree is via the dice-roll interactable
  magic_tree: [{ x: 540, y: 50, w: 120, h: 40, to: "hallway_battle" }],

  hallway_battle: [
    // Top of hallway → battle_01
    { x: 291, y: 230, w: 668, h: 70, to: "battle_01" },
  ],
  battle_01: [
    // West door → final battle
    {
      x: 169,
      y: 181,
      w: 25,
      h: 556,
      to: "final_battle",
      condition: () => gnomes.every((g) => !g.alive),
      onBlocked: () => showMessage("Defeat all the gnomes first!"),
    },
    // Secret loot room — only active after hidden lever is pulled
    {
      x: 519,
      y: 220,
      w: 322,
      h: 50,
      to: "loot_room",
      condition: () => gameState.lootRoomUnlocked,
    },
  ],
  loot_room: [
    // Bottom exit → back to battle_01
    {
      x: 354,
      y: 645,
      w: 540,
      h: 65,
      to: "battle_01",
      spawnX: 620,
      spawnY: 310,
    },
  ],
  final_battle: [
    // West exit → cliff
    {
      x: 143,
      y: 243,
      w: 25,
      h: 437,
      to: "cliff_exit",
      condition: () => !hag.alive && !hagClone.alive,
      onBlocked: () => showMessage("Defeat Auntie Ethel first!"),
      onEnter: () => {
        gameState.gameCompleted = true;
      },
    },
  ],
  cliff_exit: [
    // Right wall → good/bad ending if game completed
    {
      x: 930,
      y: 250,
      w: 30,
      h: 250,
      get to() {
        if (gameState.gameCompleted) {
          return gameState.childSaved ? "good_ending" : "bad_ending";
        }
        return "cottage";
      },
    },
  ],
};

// ============================================================
//  COLLISION BOXES (furniture/obstacles)
// ============================================================
const COLLISION_BOXES = {
  cottage: [],
  hallway_dungeon: [],
  hexed: [],
  magic_tree: [],
  hallway_battle: [],
  battle_01: [],
  loot_room: [],
  final_battle: [],
  cliff_exit: [],
};

// ============================================================
//  INTERACTABLES
// ============================================================
const INTERACTABLES = {
  cottage: [
    // Key — required to unlock the cage in final_battle
    {
      x: 497,
      y: 152,
      w: 39,
      h: 23,
      label: "Key",
      action: () => {
        if (!gameState.hasKey) {
          gameState.hasKey = true;
          showMessage("You picked up a small iron key.");
        } else {
          showMessage("You already have the key.");
        }
      },
    },
    // Book of Lore
    {
      x: 536,
      y: 576,
      w: 80,
      h: 47,
      label: "Book",
      action: () => {
        bookState.active = true;
        bookState.page = 0;
      },
    },
  ],

  hexed: [],

  battle_01: [
    // Hidden lever — unlocks the secret loot room door
    // TODO: position x/y/w/h over the lever on the map
    {
      x: 879,
      y: 119,
      w: 40,
      h: 40,
      label: "Lever",
      action: () => {
        if (!gameState.lootRoomUnlocked) {
          gameState.lootRoomUnlocked = true;
          showMessage("Click! You hear something open nearby...");
        } else {
          showMessage("The lever is already pulled.");
        }
      },
    },
  ],

  hallway_dungeon: [],
  magic_tree: [],
  hallway_battle: [],
  loot_room: [],
  final_battle: [
    // Cage — click to interact with the trapped child
    // TODO: position over cage on map using cursor overlay
    {
      x: 598,
      y: 424,
      w: 50,
      h: 50,
      label: "Cage",
      action: () => {
        if (!gameState.hasKey) {
          showMessage("The cage is locked. You need a key to open it.");
          return;
        }
        if (gameState.childSaved !== null) {
          showMessage(
            gameState.childSaved
              ? "The child is free."
              : "You left the child behind.",
          );
          return;
        }
        choiceState = {
          active: true,
          lines: [
            "A child is trapped in the cage.",
            "Do you want to save them?",
          ],
          onYes: () => {
            gameState.childSaved = true;
            showMessage("You unlock the cage. The child runs to safety!");
            choiceState.active = false;
          },
          onNo: () => {
            gameState.childSaved = false;
            showMessage("You leave the child behind...");
            choiceState.active = false;
          },
        };
      },
    },
  ],
  cliff_exit: [],
};

// ============================================================
//  GAME STATE
// ============================================================
const gameState = {
  lootRoomUnlocked: false,
  treeCleared: false,
  hasKey: false,
  childSaved: null,
  gameCompleted: false,
  bookRead: false,
};

// ============================================================
//  COMBAT STATE
// ============================================================
const GNOME_MAX_HP = 30;
const GNOME_ATK_DMG = 8;
const PLAYER_PROJ_DMG = 10;
const GNOME_ATK_DELAY = 100;
const GNOME_ATK_SPACING = 50;

let gnomeTurnTimer = 0;
let gnomeAttackQueue = [];
let gnomeAttackTimer = 0;
let playerAtkCooldown = 0;

function rollD6() {
  return Math.floor(Math.random() * 6) + 1;
}

// ============================================================
//  GNOMES
// ============================================================
const gnomeSprite = new Image();
gnomeSprite.src = "maps/gnomes.png";

const gnomes = [
  {
    x: 380,
    y: 250,
    hitW: 80,
    hitH: 80,
    hp: GNOME_MAX_HP,
    maxHp: GNOME_MAX_HP,
    alive: true,
  },
  {
    x: 750,
    y: 250,
    hitW: 80,
    hitH: 80,
    hp: GNOME_MAX_HP,
    maxHp: GNOME_MAX_HP,
    alive: true,
  },
  {
    x: 380,
    y: 560,
    hitW: 80,
    hitH: 80,
    hp: GNOME_MAX_HP,
    maxHp: GNOME_MAX_HP,
    alive: true,
  },
  {
    x: 750,
    y: 560,
    hitW: 80,
    hitH: 80,
    hp: GNOME_MAX_HP,
    maxHp: GNOME_MAX_HP,
    alive: true,
  },
];

// ============================================================
//  MAP OVERLAY
// ============================================================
const mapOverlayImage = new Image();
mapOverlayImage.src = "maps/toggle_map.png";

let mapOpen = false;

const MAP_BTN = { x: 16, y: H - 56, w: 60, h: 36 };

function toggleMap() {
  mapOpen = !mapOpen;
  canvas.style.cursor = mapOpen ? "default" : "none";
}

const MAP_ROOM_POSITIONS = {
  cottage: { x: 603, y: 733 },
  hallway_dungeon: { x: 827, y: 658 },
  hexed: { x: 997, y: 507 },
  magic_tree: { x: 997, y: 507 },
  hallway_battle: { x: 871, y: 325 },
  battle_01: { x: 723, y: 185 },
  loot_room: { x: 723, y: 185 },
  final_battle: { x: 419, y: 259 },
  cliff_exit: { x: 504, y: 530 },
};

// ============================================================
//  AUDIO
// ============================================================
const sfxGnomeHit = new Audio("audio/ALIBI-FX-8Bit-Hit 04.mp3");
const sfxHerbAttack = new Audio("audio/FLAME.mp3");
const sfxOgreAttack = new Audio("audio/PUNCH.mp3");
const sfxRogueAttack = new Audio("audio/ARROW.mp3");
const sfxMainTheme = new Audio("audio/main_theme.mp3");
sfxMainTheme.loop = true;
const sfxCave = new Audio("audio/CAVE.mp3");
sfxCave.loop = true;
const sfxDice = new Audio("audio/dice.mp3");

function playSound(sfx) {
  sfx.currentTime = 0;
  sfx.play().catch(() => {});
}

// ============================================================
//  SPARKLES
// ============================================================
const sparkles = []; // { x, y, vx, vy, life }
const SPARKLE_HP = 5; // HP restored per sparkle

function spawnSparkles(x, y) {
  const count = 4;
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
    sparkles.push({
      x,
      y,
      vx: Math.cos(angle) * (1 + Math.random()),
      vy: Math.sin(angle) * (1 + Math.random()),
      life: 300, // frames before disappearing
    });
  }
}

// ============================================================
//  CHILD + CAGE
// ============================================================
const childSprite = new Image();
childSprite.src = "maps/child.png";
const cageSprite = new Image();
cageSprite.src = "maps/cage.png";

const CAGE_POS = { x: 480, y: 320, w: 180, h: 240 };

// ============================================================
//  BOOK OF LORE
// ============================================================
const bookPages = [
  (() => {
    const i = new Image();
    i.src = "maps/book_of_Lore01.png";
    return i;
  })(),
  (() => {
    const i = new Image();
    i.src = "maps/book_of_Lore02.png";
    return i;
  })(),
];

let bookState = {
  active: false,
  page: 0,
};

function closeBook() {
  if (!bookState.active) return;
  bookState.active = false;
  if (!gameState.bookRead) {
    gameState.bookRead = true;
    showMessage(
      "The magic mirror on the wall shimmers with an eerie light... perhaps it leads somewhere.",
      420,
    );
  }
}

// ============================================================
//  AUNTIE ETHEL
// ============================================================
const hagSprite = new Image();
hagSprite.src = "maps/Hag.png";

const HAG_MAX_HP = 80;
const HAG_ATK_DMG = 20;
const HAG_ATK_DELAY = 120;
const HAG_PLAYER_DMG = 20;

const hag = {
  x: 300,
  y: 679,
  hitW: 120,
  hitH: 120,
  hp: HAG_MAX_HP,
  maxHp: HAG_MAX_HP,
  alive: true,
};

// Clone — spawns when hag reaches half HP
const hagClone = {
  x: 880,
  y: 759,
  hitW: 120,
  hitH: 120,
  hp: 0,
  maxHp: Math.floor(HAG_MAX_HP / 2),
  alive: false,
};

let hagSplit = false;
let hagTurnTimer = 0;
let hagCloneTurnTimer = 0;

// ============================================================
//  DIALOGUE CHOICE
// ============================================================
let choiceState = {
  active: false,
  lines: [],
  onYes: null,
  onNo: null,
};

// ============================================================
//  PROJECTILES
// ============================================================
const PROJ_SPEED = 10;
const PROJ_LIFE = 90; // frames before disappearing (~1.5s)

const projectiles = [];

// ============================================================
//  CHARACTER SELECT
// ============================================================
const characters = [
  {
    name: "Herb the Wizard",
    sprite: "maps/Herb_theWIZ.png",
    previewX: 290,
    previewY: 60,
    previewW: 900,
    projectile: "bolt",
    gameW: 380,
  },
  {
    name: "The Rogue",
    sprite: "maps/rogue.png",
    previewX: 380,
    previewY: 60,
    previewW: 680,
    projectile: "arrow",
    gameW: 355,
    aimOffsetY: 40,
  },
  {
    name: "The Ogre",
    sprite: "maps/ogre.png",
    previewX: 395,
    previewY: 30,
    previewW: 750,
    projectile: "rock",
    gameW: 360,
    aimOffsetY: 20,
    aimOffsetX: -30,
  },
];

const charPreviewSprites = characters.map((c) => {
  const img = new Image();
  img.src = c.sprite;
  return img;
});

let charSelectIndex = 0;

const CHAR_SELECT_BUTTONS = {
  left: { x: 277, y: 387, w: 73, h: 81 },
  right: { x: 943, y: 387, w: 73, h: 76 },
  start: { x: 593, y: 191, w: 167, h: 60 },
};

let pendingTransition = null;

// ============================================================
//  DICE STATE
// ============================================================
let diceState = {
  dialogueIndex: 0,
  rolling: false,
  rollFrame: 0,
  displayNum: 1,
  result: null,
  passed: false,
};

function resetDice() {
  diceState = {
    dialogueIndex: 0,
    rolling: false,
    rollFrame: 0,
    displayNum: 1,
    result: null,
    passed: false,
  };
}

const mapImages = {};
for (const [name, room] of Object.entries(ROOMS)) {
  const img = new Image();
  img.src = room.mapSrc;
  mapImages[name] = img;
}

let currentRoom = "control_page";
let transitionCooldown = 0;

function transitionToRoom(roomName, spawnX, spawnY) {
  const room = ROOMS[roomName];
  currentRoom = roomName;
  bookState.active = false;

  if (roomName === "start_page_sign") {
    sfxMainTheme.currentTime = 0;
    sfxMainTheme.play().catch(() => {});
  }
  if (roomName === "hallway_dungeon") {
    sfxMainTheme.pause();
    sfxMainTheme.currentTime = 0;
    sfxCave.currentTime = 0;
    sfxCave.play().catch(() => {});
  }
  if (roomName === "cliff_exit") {
    sfxCave.pause();
    sfxCave.currentTime = 0;
  }
  if (roomName === "good_ending" || roomName === "bad_ending") {
    sfxMainTheme.currentTime = 0;
    sfxMainTheme.play().catch(() => {});
  }
  if (room.type === "game") {
    player.x = spawnX !== undefined ? spawnX : room.spawnX;
    player.y = spawnY !== undefined ? spawnY : room.spawnY;
  }

  canvas.style.cursor = room.type === "game" ? "none" : "default";
  transitionCooldown = 90;
  pendingTransition = null;
}

canvas.style.cursor = ROOMS[currentRoom].type === "game" ? "none" : "default";

// ============================================================
//  PLAYER SPRITES
// ============================================================
function loadSprite(path, fallback) {
  const img = new Image();
  img.src = path;
  img.onerror = () => {
    img.src = fallback;
  };
  return img;
}

const PLACEHOLDER = "maps/Herb_theWIZ.png";
const playerSprites = {
  down: loadSprite("maps/Herb_front.png", PLACEHOLDER),
  up: loadSprite("maps/Herb_back.png", PLACEHOLDER),
  right: loadSprite("maps/Herb_side.png", PLACEHOLDER),
};

// ============================================================
//  PLAYER
// ============================================================
const player = {
  x: ROOMS.cottage.spawnX,
  y: ROOMS.cottage.spawnY,
  w: 380,
  h: 380,
  hitW: 120,
  hitH: 120,
  speed: 5,
  direction: "down",
  hp: 150,
  maxHp: 150,
};

// ============================================================
//  INPUT
// ============================================================
const keysHeld = {};

document.addEventListener("keydown", (e) => {
  keysHeld[e.key.toLowerCase()] = true;

  if ((e.key === "m" || e.key === "M") && ROOMS[currentRoom].type === "game") {
    toggleMap();
    return;
  }

  // Book of Lore overlay
  if (bookState.active) {
    if (e.key === "ArrowLeft") bookState.page = Math.max(0, bookState.page - 1);
    if (e.key === "ArrowRight")
      bookState.page = Math.min(bookPages.length - 1, bookState.page + 1);
    if (e.key === "Escape") closeBook();
    return;
  }

  // UI screens
  if (ROOMS[currentRoom].type === "ui") {
    const room = ROOMS[currentRoom];
    const keyMatch = !room.advanceKey || e.key === room.advanceKey;
    if (keyMatch && room.next) {
      transitionToRoom(room.next);
      return; // prevent the same keypress falling through to other handlers
    }
  }

  // Character select: arrow keys cycle, Enter/Space confirms
  if (ROOMS[currentRoom].type === "character_select") {
    if (e.key === "ArrowLeft") {
      charSelectIndex =
        (charSelectIndex - 1 + characters.length) % characters.length;
    } else if (e.key === "ArrowRight") {
      charSelectIndex = (charSelectIndex + 1) % characters.length;
    } else if (e.key === "Enter" || e.key === " ") {
      transitionToRoom(ROOMS[currentRoom].next);
    }
  }

  // Dice rooms: SPACE advances dialogue then triggers the roll
  if (ROOMS[currentRoom].type === "dice" && e.key === " ") {
    const dialogue = ROOMS[currentRoom].dialogue || [];
    if (diceState.dialogueIndex < dialogue.length) {
      // Still in dialogue — advance to next line
      diceState.dialogueIndex++;
    } else if (!diceState.rolling && !diceState.passed) {
      // Dialogue done — start the roll
      diceState.rolling = true;
      diceState.rollStart = performance.now();
      diceState.result = Math.floor(Math.random() * 20) + 1;
      diceState.displayNum = 1;
      playSound(sfxDice);
    }
  }
});

document.addEventListener(
  "keyup",
  (e) => (keysHeld[e.key.toLowerCase()] = false),
);

// ============================================================
//  MOUSE
// ============================================================
let mouseX = W / 2;
let mouseY = H / 2;

canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  mouseX = e.clientX - rect.left;
  mouseY = e.clientY - rect.top;
});

canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  const cx = e.clientX - rect.left;
  const cy = e.clientY - rect.top;

  // Map button click
  if (
    ROOMS[currentRoom].type === "game" &&
    cx >= MAP_BTN.x &&
    cx <= MAP_BTN.x + MAP_BTN.w &&
    cy >= MAP_BTN.y &&
    cy <= MAP_BTN.y + MAP_BTN.h
  ) {
    toggleMap();
    return;
  }

  // Book of Lore: click left half to go back, right half to advance, either to close on last page
  if (bookState.active) {
    if (cx < W / 2) {
      bookState.page = Math.max(0, bookState.page - 1);
    } else {
      if (bookState.page < bookPages.length - 1) {
        bookState.page++;
      } else {
        closeBook(); // close after last page
      }
    }
    return;
  }

  if (ROOMS[currentRoom].type === "character_select") {
    const b = CHAR_SELECT_BUTTONS;
    if (
      cx >= b.left.x &&
      cx <= b.left.x + b.left.w &&
      cy >= b.left.y &&
      cy <= b.left.y + b.left.h
    ) {
      charSelectIndex =
        (charSelectIndex - 1 + characters.length) % characters.length;
    } else if (
      cx >= b.right.x &&
      cx <= b.right.x + b.right.w &&
      cy >= b.right.y &&
      cy <= b.right.y + b.right.h
    ) {
      charSelectIndex = (charSelectIndex + 1) % characters.length;
    } else if (
      cx >= b.start.x &&
      cx <= b.start.x + b.start.w &&
      cy >= b.start.y &&
      cy <= b.start.y + b.start.h
    ) {
      transitionToRoom(ROOMS[currentRoom].next);
    }
    return;
  }

  if (ROOMS[currentRoom].type !== "game") return;

  // Choice dialogue active — check Yes/No button clicks
  if (choiceState.active) {
    const midX = W / 2;
    const boxY = H - 220;
    // Yes button: left half of button row
    if (
      cx >= midX - 160 &&
      cx <= midX - 20 &&
      cy >= boxY + 120 &&
      cy <= boxY + 160
    ) {
      choiceState.onYes && choiceState.onYes();
    }
    // No button: right half
    if (
      cx >= midX + 20 &&
      cx <= midX + 160 &&
      cy >= boxY + 120 &&
      cy <= boxY + 160
    ) {
      choiceState.onNo && choiceState.onNo();
    }
    return;
  }

  for (const obj of INTERACTABLES[currentRoom] || []) {
    if (
      cx >= obj.x &&
      cx <= obj.x + obj.w &&
      cy >= obj.y &&
      cy <= obj.y + obj.h
    ) {
      obj.action();
      return;
    }
  }

  // No interactable clicked — fire a magic bolt toward the cursor
  if (playerAtkCooldown > 0) return; // turn-based: wait for cooldown
  playerAtkCooldown = 60; // ~1s between shots
  const drawX = player.x - (player.w - player.hitW) / 2;
  const drawY = player.y - (player.h - player.hitH);
  const originX = drawX + player.w / 2 - 10;
  const originY = drawY + player.h / 2 - 10;
  const angle = Math.atan2(cy - originY, cx - originX);
  const projType = characters[charSelectIndex].projectile;
  if (projType === "bolt") playSound(sfxHerbAttack);
  if (projType === "rock") playSound(sfxOgreAttack);
  if (projType === "arrow") playSound(sfxRogueAttack);
  projectiles.push({
    x: originX,
    y: originY,
    vx: Math.cos(angle) * PROJ_SPEED,
    vy: Math.sin(angle) * PROJ_SPEED,
    life: PROJ_LIFE,
    isEnemy: false,
    type: projType,
  });
  // Start gnome counter-attack timer when in battle room
  if (currentRoom === "battle_01" && gnomeTurnTimer === 0) {
    gnomeTurnTimer = GNOME_ATK_DELAY;
  }
  // Start Auntie Ethel counter-attack timers when in final battle room
  if (currentRoom === "final_battle" && hagTurnTimer === 0 && hag.alive) {
    hagTurnTimer = HAG_ATK_DELAY;
  }
  if (
    currentRoom === "final_battle" &&
    hagCloneTurnTimer === 0 &&
    hagClone.alive
  ) {
    hagCloneTurnTimer = HAG_ATK_DELAY;
  }
});

// ============================================================
//  COLLISION HELPERS
// ============================================================
function pointInPolygon(x, y, poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i].x,
      yi = poly[i].y;
    const xj = poly[j].x,
      yj = poly[j].y;
    const intersect =
      yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

function playerInBounds(px, py) {
  const poly = ROOMS[currentRoom].polygon;
  if (!poly) return true;
  const cx = px + player.hitW / 2;
  const cy = py + player.hitH / 2;
  return pointInPolygon(cx, cy, poly);
}

function collidesWithAny(px, py) {
  for (const box of COLLISION_BOXES[currentRoom] || []) {
    if (
      px < box.x + box.w &&
      px + player.hitW > box.x &&
      py < box.y + box.h &&
      py + player.hitH > box.y
    )
      return true;
  }
  return false;
}

let activeMessage = "";
let messageFrames = 0;

function showMessage(text, frames = 210) {
  activeMessage = text;
  messageFrames = frames;
}

function update() {
  if (ROOMS[currentRoom].type === "ui") return;
  if (ROOMS[currentRoom].type === "character_select") return;

  if (ROOMS[currentRoom].type === "dice") {
    if (diceState.rolling) {
      diceState.displayNum = Math.floor(Math.random() * 20) + 1;
      if (performance.now() - diceState.rollStart >= 6000) {
        diceState.rolling = false;
        diceState.displayNum = diceState.result;
        const dc = ROOMS[currentRoom].dc;
        diceState.passed = diceState.result >= dc;
        if (diceState.passed) {
          gameState.treeCleared = true;
          pendingTransition = { to: ROOMS[currentRoom].next, delay: 180 };
        }
      }
    }
    if (pendingTransition) {
      pendingTransition.delay--;
      if (pendingTransition.delay <= 0) {
        transitionToRoom(pendingTransition.to);
      }
    }
    return;
  }

  if (bookState.active || mapOpen) return;

  if (pendingTransition) {
    pendingTransition.delay--;
    if (pendingTransition.delay <= 0) {
      transitionToRoom(pendingTransition.to);
      return;
    }
  }

  const prevX = player.x;
  const prevY = player.y;

  if (keysHeld["a"] || keysHeld["arrowleft"]) {
    player.x -= player.speed;
    player.direction = "left";
  }
  if (keysHeld["d"] || keysHeld["arrowright"]) {
    player.x += player.speed;
    player.direction = "right";
  }
  if (
    !playerInBounds(player.x, player.y) ||
    collidesWithAny(player.x, player.y)
  )
    player.x = prevX;

  if (keysHeld["w"] || keysHeld["arrowup"]) {
    player.y -= player.speed;
    player.direction = "up";
  }
  if (keysHeld["s"] || keysHeld["arrowdown"]) {
    player.y += player.speed;
    player.direction = "down";
  }
  if (
    !playerInBounds(player.x, player.y) ||
    collidesWithAny(player.x, player.y)
  )
    player.y = prevY;

  if (messageFrames > 0) messageFrames--;

  // Cooldowns
  if (playerAtkCooldown > 0) playerAtkCooldown--;

  // Move projectiles, check collisions, expire old ones
  for (let i = projectiles.length - 1; i >= 0; i--) {
    const p = projectiles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.life--;

    if (p.isEnemy) {
      // Enemy projectile hits Herb?
      if (
        p.x >= player.x &&
        p.x <= player.x + player.hitW &&
        p.y >= player.y &&
        p.y <= player.y + player.hitH
      ) {
        const dmg = p.damage !== undefined ? p.damage : GNOME_ATK_DMG;
        player.hp = Math.max(0, player.hp - dmg);
        playSound(sfxGnomeHit);
        if (p.fromHag) {
          showMessage(`Auntie Ethel strikes you! (-${dmg} HP)`);
        } else {
          showMessage(`A gnome hits you! (-${dmg} HP)`);
        }
        projectiles.splice(i, 1);
        continue;
      }
    } else if (currentRoom === "battle_01") {
      // Player projectile hits a gnome?
      let hitGnome = false;
      for (const g of gnomes) {
        if (!g.alive) continue;
        if (
          p.x >= g.x &&
          p.x <= g.x + g.hitW &&
          p.y >= g.y &&
          p.y <= g.y + g.hitH
        ) {
          g.hp = Math.max(0, g.hp - PLAYER_PROJ_DMG);
          if (g.hp <= 0) {
            g.alive = false;
            spawnSparkles(g.x + g.hitW / 2, g.y + g.hitH / 2);
            const allDead = gnomes.every((g) => !g.alive);
            if (allDead) {
              player.hp = player.maxHp;
              showMessage("Victory! Your wounds are healed.");
            } else {
              showMessage("A gnome falls!");
            }
          }
          projectiles.splice(i, 1);
          hitGnome = true;
          // Start gnome counter-attack timer
          if (gnomeTurnTimer === 0) gnomeTurnTimer = GNOME_ATK_DELAY;
          break;
        }
      }
      if (hitGnome) continue;
    } else if (currentRoom === "final_battle") {
      // Player projectile hits Auntie Ethel?
      if (
        hag.alive &&
        p.x >= hag.x &&
        p.x <= hag.x + hag.hitW &&
        p.y >= hag.y &&
        p.y <= hag.y + hag.hitH
      ) {
        hag.hp = Math.max(0, hag.hp - HAG_PLAYER_DMG);
        // Trigger split at half HP (once only)
        if (!hagSplit && hag.hp <= Math.floor(hag.maxHp / 2) && hag.hp > 0) {
          hagSplit = true;
          hagClone.alive = true;
          hagClone.hp = hagClone.maxHp;
          showMessage(
            "Auntie Ethel cackles and splits in two! Defeat them both!",
            360,
          );
        } else if (hag.hp <= 0) {
          hag.alive = false;
          if (!hagClone.alive) {
            player.hp = player.maxHp;
            showMessage("Auntie Ethel is defeated! Your wounds are healed.");
          } else {
            showMessage("One down — her clone still fights!");
          }
        } else {
          showMessage(`You hit Auntie Ethel! (-${HAG_PLAYER_DMG} HP)`);
        }
        projectiles.splice(i, 1);
        if (hagTurnTimer === 0 && hag.alive) hagTurnTimer = HAG_ATK_DELAY;
        continue;
      }
      // Player projectile hits the clone?
      if (
        hagClone.alive &&
        p.x >= hagClone.x &&
        p.x <= hagClone.x + hagClone.hitW &&
        p.y >= hagClone.y &&
        p.y <= hagClone.y + hagClone.hitH
      ) {
        hagClone.hp = Math.max(0, hagClone.hp - HAG_PLAYER_DMG);
        if (hagClone.hp <= 0) {
          hagClone.alive = false;
          if (!hag.alive) {
            player.hp = player.maxHp;
            showMessage("Auntie Ethel is defeated! Your wounds are healed.");
          } else {
            showMessage("The clone vanishes — finish Auntie Ethel!");
          }
        } else {
          showMessage(`You hit the clone! (-${HAG_PLAYER_DMG} HP)`);
        }
        projectiles.splice(i, 1);
        if (hagCloneTurnTimer === 0 && hagClone.alive)
          hagCloneTurnTimer = HAG_ATK_DELAY;
        continue;
      }
    }

    if (p.life <= 0) projectiles.splice(i, 1);
  }

  // Gnome counter-attack — turn-by-turn
  if (currentRoom === "battle_01") {
    // Initial delay before gnomes start their turn
    if (gnomeTurnTimer > 0) {
      gnomeTurnTimer--;
      if (gnomeTurnTimer === 0) {
        // Build attack queue: one entry per alive gnome
        gnomeAttackQueue = gnomes
          .map((g, i) => i)
          .filter((i) => gnomes[i].alive);
        gnomeAttackTimer = 0; // fire first gnome immediately
      }
    }
    // Fire gnomes one at a time from the queue
    if (gnomeAttackQueue.length > 0) {
      gnomeAttackTimer--;
      if (gnomeAttackTimer <= 0) {
        const idx = gnomeAttackQueue.shift();
        const g = gnomes[idx];
        if (g.alive) {
          const pcx = player.x + player.hitW / 2;
          const pcy = player.y + player.hitH / 2;
          const gx = g.x + g.hitW / 2;
          const gy = g.y + g.hitH / 2;
          const angle = Math.atan2(pcy - gy, pcx - gx);
          projectiles.push({
            x: gx,
            y: gy,
            vx: Math.cos(angle) * 6,
            vy: Math.sin(angle) * 6,
            life: 120,
            isEnemy: true,
          });
        }
        gnomeAttackTimer = GNOME_ATK_SPACING; // delay before next gnome fires
      }
    }
  }

  // Auntie Ethel counter-attack
  if (currentRoom === "final_battle" && hag.alive) {
    if (hagTurnTimer > 0) {
      hagTurnTimer--;
      if (hagTurnTimer === 0) {
        const pcx = player.x + player.hitW / 2;
        const pcy = player.y + player.hitH / 2;
        const hx = hag.x + hag.hitW / 2;
        const hy = hag.y + hag.hitH / 2;
        const angle = Math.atan2(pcy - hy, pcx - hx);
        projectiles.push({
          x: hx,
          y: hy,
          vx: Math.cos(angle) * 6,
          vy: Math.sin(angle) * 6,
          life: 150,
          isEnemy: true,
          damage: HAG_ATK_DMG,
          fromHag: true,
        });
      }
    }
  }

  // Clone counter-attack
  if (currentRoom === "final_battle" && hagClone.alive) {
    if (hagCloneTurnTimer > 0) {
      hagCloneTurnTimer--;
      if (hagCloneTurnTimer === 0) {
        const pcx = player.x + player.hitW / 2;
        const pcy = player.y + player.hitH / 2;
        const hx = hagClone.x + hagClone.hitW / 2;
        const hy = hagClone.y + hagClone.hitH / 2;
        const angle = Math.atan2(pcy - hy, pcx - hx);
        projectiles.push({
          x: hx,
          y: hy,
          vx: Math.cos(angle) * 6,
          vy: Math.sin(angle) * 6,
          life: 150,
          isEnemy: true,
          damage: HAG_ATK_DMG,
          fromHag: true,
        });
      }
    }
  }

  // Move sparkles and check if Herb walks over them
  for (let i = sparkles.length - 1; i >= 0; i--) {
    const s = sparkles[i];
    s.x += s.vx;
    s.y += s.vy;
    s.vx *= 0.95; // slow down over time
    s.vy *= 0.95;
    s.life--;
    // Herb collects sparkle?
    if (
      s.x >= player.x &&
      s.x <= player.x + player.hitW &&
      s.y >= player.y &&
      s.y <= player.y + player.hitH
    ) {
      player.hp = Math.min(player.maxHp, player.hp + SPARKLE_HP);
      sparkles.splice(i, 1);
      continue;
    }
    if (s.life <= 0) sparkles.splice(i, 1);
  }

  if (transitionCooldown > 0) {
    transitionCooldown--;
  } else {
    const pcx = player.x + player.hitW / 2;
    const pcy = player.y + player.hitH / 2;
    for (const trigger of TRIGGERS[currentRoom] || []) {
      if (
        pcx >= trigger.x &&
        pcx <= trigger.x + trigger.w &&
        pcy >= trigger.y &&
        pcy <= trigger.y + trigger.h
      ) {
        if (!trigger.condition || trigger.condition()) {
          if (trigger.onEnter) trigger.onEnter();
          transitionToRoom(trigger.to, trigger.spawnX, trigger.spawnY);
          break;
        } else if (trigger.onBlocked) {
          trigger.onBlocked();
          break;
        }
      }
    }
  }
}

// ============================================================
//  DRAW
// ============================================================
function draw() {
  ctx.clearRect(0, 0, W, H);

  const img = mapImages[currentRoom];
  if (img && img.complete && img.naturalWidth > 0) {
    ctx.drawImage(img, 0, 0, W, H);
  } else {
    for (let col = 0; col < W; col += 40) {
      for (let row = 0; row < H; row += 40) {
        ctx.fillStyle = (col / 40 + row / 40) % 2 === 0 ? "#1a1230" : "#130e28";
        ctx.fillRect(col, row, 40, 40);
      }
    }
  }

  // --- Child + Cage drawn early so debug box renders on top ---
  if (currentRoom === "final_battle") {
    const cp = CAGE_POS;
    const cx = cp.x + cp.w / 2;
    if (
      gameState.childSaved !== true &&
      childSprite.complete &&
      childSprite.naturalWidth > 0
    ) {
      const cw = 950;
      const ch = cw * (childSprite.naturalHeight / childSprite.naturalWidth);
      ctx.drawImage(childSprite, cx - cw / 2, cp.y + cp.h - ch + 280, cw, ch);
    }
    if (cageSprite.complete && cageSprite.naturalWidth > 0) {
      const cw = 1000;
      const ch = cw * (cageSprite.naturalHeight / cageSprite.naturalWidth);
      ctx.drawImage(cageSprite, cx - cw / 2, cp.y + cp.h - ch + 280, cw, ch);
    }
  }

  if (ROOMS[currentRoom].type === "ui") {
    const prompt = ROOMS[currentRoom].promptText;
    if (prompt) {
      ctx.fillStyle = "rgba(0,0,0,0.55)";
      ctx.fillRect(0, H - 56, W, 56);
      ctx.fillStyle = "rgba(255,220,120,0.9)";
      ctx.font = "16px Georgia, serif";
      ctx.textAlign = "center";
      ctx.fillText(prompt, W / 2, H - 20);
      ctx.textAlign = "left";
    }
    return;
  }

  if (ROOMS[currentRoom].type === "character_select") {
    const char = characters[charSelectIndex];
    const sprite = charPreviewSprites[charSelectIndex];
    const b = CHAR_SELECT_BUTTONS;

    // Highlight left arrow on hover
    if (
      mouseX >= b.left.x &&
      mouseX <= b.left.x + b.left.w &&
      mouseY >= b.left.y &&
      mouseY <= b.left.y + b.left.h
    ) {
      ctx.fillStyle = "rgba(255,255,255,0.15)";
      ctx.fillRect(b.left.x, b.left.y, b.left.w, b.left.h);
    }
    // Highlight right arrow on hover
    if (
      mouseX >= b.right.x &&
      mouseX <= b.right.x + b.right.w &&
      mouseY >= b.right.y &&
      mouseY <= b.right.y + b.right.h
    ) {
      ctx.fillStyle = "rgba(255,255,255,0.15)";
      ctx.fillRect(b.right.x, b.right.y, b.right.w, b.right.h);
    }
    // Highlight start button on hover
    if (
      mouseX >= b.start.x &&
      mouseX <= b.start.x + b.start.w &&
      mouseY >= b.start.y &&
      mouseY <= b.start.y + b.start.h
    ) {
      ctx.fillStyle = "rgba(255,255,255,0.15)";
      ctx.fillRect(b.start.x, b.start.y, b.start.w, b.start.h);
    }

    // Character preview sprite — size/position defined per character
    if (sprite && sprite.complete && sprite.naturalWidth > 0) {
      const c = characters[charSelectIndex];
      ctx.drawImage(sprite, c.previewX, c.previewY, c.previewW, c.previewW);
    }

    return;
  }

  if (ROOMS[currentRoom].type === "dice") {
    const dc = ROOMS[currentRoom].dc;
    const dialogue = ROOMS[currentRoom].dialogue || [];
    const inDialogue = diceState.dialogueIndex < dialogue.length;

    ctx.textAlign = "center";

    if (inDialogue) {
      ctx.fillStyle = "rgba(0,0,0,0.45)";
      ctx.fillRect(0, 0, W, H);

      // Dialogue box at bottom
      const boxH = 160;
      const boxY = H - boxH - 20;
      ctx.fillStyle = "rgba(10,30,10,0.88)";
      ctx.strokeStyle = "rgba(100,220,100,0.7)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(40, boxY, W - 80, boxH, 10);
      ctx.fill();
      ctx.stroke();

      // Speaker name
      ctx.fillStyle = "#88ff88";
      ctx.font = "bold 16px Georgia, serif";
      ctx.fillText("The Magic Tree", W / 2, boxY + 30);

      // Dialogue line
      ctx.fillStyle = "#ffffff";
      ctx.font = "20px Georgia, serif";
      ctx.fillText(dialogue[diceState.dialogueIndex], W / 2, boxY + 75);

      ctx.fillStyle = "rgba(255,220,120,0.7)";
      ctx.font = "13px Georgia, serif";
      ctx.fillText("Press SPACE to continue", W / 2, boxY + 130);
    } else {
      // ── Dice roll phase ──────────────────────────────────────
      ctx.fillStyle = "rgba(0,0,0,0.65)";
      ctx.fillRect(0, 0, W, H);

      // Title
      ctx.fillStyle = "rgba(180,255,180,0.95)";
      ctx.font = "bold 28px Georgia, serif";
      ctx.fillText("Prove your worth...", W / 2, H / 2 - 160);

      ctx.fillStyle = "rgba(255,255,255,0.7)";
      ctx.font = "16px Georgia, serif";
      ctx.fillText(
        `Roll ${dc} or higher to be granted passage`,
        W / 2,
        H / 2 - 115,
      );

      if (diceState.result === null && !diceState.rolling) {
        ctx.fillStyle = "rgba(255,220,120,0.9)";
        ctx.font = "20px Georgia, serif";
        ctx.fillText("Press SPACE to roll", W / 2, H / 2 + 20);
      } else {
        // Dice circle
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.beginPath();
        ctx.arc(W / 2, H / 2, 80, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = diceState.rolling
          ? "rgba(255,255,255,0.4)"
          : diceState.passed
            ? "#88ff88"
            : "#ff6666";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(W / 2, H / 2, 80, 0, Math.PI * 2);
        ctx.stroke();

        // Number
        ctx.fillStyle = diceState.rolling
          ? "rgba(255,255,255,0.9)"
          : diceState.passed
            ? "#88ff88"
            : "#ff6666";
        ctx.font = "bold 72px Georgia, serif";
        ctx.fillText(diceState.displayNum, W / 2, H / 2 + 25);

        // Result message
        if (!diceState.rolling && diceState.result !== null) {
          if (diceState.passed) {
            ctx.fillStyle = "#88ff88";
            ctx.font = "22px Georgia, serif";
            ctx.fillText(
              "The tree opens the way forward...",
              W / 2,
              H / 2 + 140,
            );
          } else {
            ctx.fillStyle = "#ff8888";
            ctx.font = "20px Georgia, serif";
            ctx.fillText(
              "Not enough power. Press SPACE to try again.",
              W / 2,
              H / 2 + 140,
            );
          }
        }
      }
    }

    ctx.textAlign = "left";
    return;
  }

  // --- DEBUG overlays ---
  if (DEBUG) {
    const poly = ROOMS[currentRoom].polygon;
    if (poly) {
      ctx.strokeStyle = "rgba(80,160,255,0.6)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(poly[0].x, poly[0].y);
      for (let i = 1; i < poly.length; i++) ctx.lineTo(poly[i].x, poly[i].y);
      ctx.closePath();
      ctx.stroke();
    }
    for (const box of COLLISION_BOXES[currentRoom] || []) {
      ctx.fillStyle = "rgba(255,50,50,0.15)";
      ctx.fillRect(box.x, box.y, box.w, box.h);
      ctx.strokeStyle = "rgba(255,80,80,0.8)";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(box.x, box.y, box.w, box.h);
    }
    for (const obj of INTERACTABLES[currentRoom] || []) {
      ctx.fillStyle = "rgba(255,220,0,0.2)";
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
      ctx.strokeStyle = "rgba(255,220,0,0.8)";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(obj.x, obj.y, obj.w, obj.h);
      ctx.fillStyle = "rgba(255,220,0,0.9)";
      ctx.font = "10px monospace";
      ctx.fillText(obj.label, obj.x + 2, obj.y + 12);
    }
    for (const t of TRIGGERS[currentRoom] || []) {
      ctx.fillStyle = "rgba(0,255,150,0.15)";
      ctx.fillRect(t.x, t.y, t.w, t.h);
      ctx.strokeStyle = "rgba(0,255,150,0.7)";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(t.x, t.y, t.w, t.h);
      ctx.fillStyle = "rgba(0,255,150,0.9)";
      ctx.font = "10px monospace";
      ctx.fillText(t.to, t.x + 2, t.y + 12);
    }
  }

  // --- Interactables: invisible until hovered ---
  const roomInteractables = INTERACTABLES[currentRoom] || [];
  for (const obj of roomInteractables) {
    const hovered =
      mouseX >= obj.x &&
      mouseX <= obj.x + obj.w &&
      mouseY >= obj.y &&
      mouseY <= obj.y + obj.h;
    if (hovered) {
      ctx.strokeStyle = "#ffe44d";
      ctx.lineWidth = 2;
      ctx.strokeRect(obj.x, obj.y, obj.w, obj.h);
      ctx.fillStyle = "#ffe44d";
      ctx.font = "11px monospace";
      ctx.fillText(obj.label, obj.x, obj.y - 5);
    }
  }

  // --- Player sprite ---
  // Use directional sprites for Herb (index 0); all other characters use their single sprite
  let sprite;
  if (charSelectIndex === 0) {
    const spriteKey =
      player.direction === "left" || player.direction === "right"
        ? "right"
        : player.direction;
    sprite = playerSprites[spriteKey];
  } else {
    sprite = charPreviewSprites[charSelectIndex];
  }

  // Per-character draw size — preserve aspect ratio for non-Herb sprites
  const charDef = characters[charSelectIndex];
  const gameW = charDef.gameW || player.w;
  const gameH =
    sprite && sprite.naturalWidth > 0
      ? gameW * (sprite.naturalHeight / sprite.naturalWidth)
      : gameW;

  const drawX = player.x - (gameW - player.hitW) / 2;
  const drawY = player.y - (gameH - player.hitH);

  // Visual centre of the sprite (used for aiming line anchor)
  const aimOffsetX = charDef.aimOffsetX || 0;
  const aimOffsetY = charDef.aimOffsetY || 0;
  const pcx = drawX + gameW / 2 - 10 + aimOffsetX;
  const pcy = drawY + gameH / 2 - 10 + aimOffsetY;

  if (sprite && sprite.complete && sprite.naturalWidth > 0) {
    ctx.save();
    if (player.direction === "right") {
      // Flip horizontally around the sprite centre
      ctx.translate(drawX + gameW, drawY);
      ctx.scale(-1, 1);
      ctx.drawImage(sprite, 0, 0, gameW, gameH);
    } else {
      ctx.drawImage(sprite, drawX, drawY, gameW, gameH);
    }
    ctx.restore();
  } else {
    // Fallback: blue square if sprite hasn't loaded yet
    ctx.fillStyle = "#4aaef0";
    ctx.fillRect(player.x, player.y, player.hitW, player.hitH);
  }

  // --- Gnomes (battle_01 only) ---
  if (currentRoom === "battle_01") {
    for (const g of gnomes) {
      if (!g.alive) continue;
      // Sprite
      if (gnomeSprite.complete && gnomeSprite.naturalWidth > 0) {
        ctx.drawImage(gnomeSprite, g.x - 195, g.y - 605, 1200, 1200);
      } else {
        ctx.fillStyle = "#44aa44";
        ctx.fillRect(g.x, g.y, g.hitW, g.hitH);
      }
      // HP bar above gnome
      const barW = g.hitW;
      const barX = g.x;
      const barY = g.y - 12;
      ctx.fillStyle = "#333";
      ctx.fillRect(barX, barY, barW, 6);
      ctx.fillStyle = "#dd2222";
      ctx.fillRect(barX, barY, barW * (g.hp / g.maxHp), 6);
    }
  }

  // --- Auntie Ethel / Hag (final_battle only) ---
  if (currentRoom === "final_battle" && hag.alive) {
    if (hagSprite.complete && hagSprite.naturalWidth > 0) {
      const hw = 380;
      const hh = hw * (hagSprite.naturalHeight / hagSprite.naturalWidth);
      // Horizontally centred on hitbox, feet aligned to hitbox bottom
      ctx.drawImage(
        hagSprite,
        hag.x + hag.hitW / 2 - hw / 2,
        hag.y + hag.hitH - hh,
        hw,
        hh,
      );
    } else {
      ctx.fillStyle = "#884488";
      ctx.fillRect(hag.x, hag.y, hag.hitW, hag.hitH);
    }
    // HP bar above the hag — wider and taller than gnome bars to feel boss-like
    const barW = 160;
    const barX = hag.x + hag.hitW / 2 - barW / 2;
    const barY = hag.y - 18;
    ctx.fillStyle = "rgba(0,0,0,0.7)";
    ctx.fillRect(barX - 2, barY - 2, barW + 4, 12);
    ctx.fillStyle = "#550000";
    ctx.fillRect(barX, barY, barW, 8);
    ctx.fillStyle = "#dd2222";
    ctx.fillRect(barX, barY, barW * (hag.hp / hag.maxHp), 8);
    // Boss name label
    ctx.fillStyle = "#ffaaee";
    ctx.font = "bold 11px monospace";
    ctx.textAlign = "center";
    ctx.fillText("Auntie Ethel", hag.x + hag.hitW / 2, barY - 4);
    ctx.textAlign = "left";
  }

  // --- Auntie Ethel clone ---
  if (currentRoom === "final_battle" && hagClone.alive) {
    if (hagSprite.complete && hagSprite.naturalWidth > 0) {
      const hw = 380;
      const hh = hw * (hagSprite.naturalHeight / hagSprite.naturalWidth);
      // Flipped horizontally so she looks like a mirror image
      ctx.save();
      ctx.translate(
        hagClone.x + hagClone.hitW / 2 + hw / 2,
        hagClone.y + hagClone.hitH - hh,
      );
      ctx.scale(-1, 1);
      ctx.drawImage(hagSprite, 0, 0, hw, hh);
      ctx.restore();
    } else {
      ctx.fillStyle = "#664488";
      ctx.fillRect(hagClone.x, hagClone.y, hagClone.hitW, hagClone.hitH);
    }
    // HP bar
    const barW = 160;
    const barX = hagClone.x + hagClone.hitW / 2 - barW / 2;
    const barY = hagClone.y - 18;
    ctx.fillStyle = "rgba(0,0,0,0.7)";
    ctx.fillRect(barX - 2, barY - 2, barW + 4, 12);
    ctx.fillStyle = "#550000";
    ctx.fillRect(barX, barY, barW, 8);
    ctx.fillStyle = "#dd2222";
    ctx.fillRect(barX, barY, barW * (hagClone.hp / hagClone.maxHp), 8);
    ctx.fillStyle = "#ffaaee";
    ctx.font = "bold 11px monospace";
    ctx.textAlign = "center";
    ctx.fillText("Ethel's Clone", hagClone.x + hagClone.hitW / 2, barY - 4);
    ctx.textAlign = "left";
  }

  // --- Sparkles ---
  for (const s of sparkles) {
    const alpha = s.life / 300;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.shadowColor = "#aaffaa";
    ctx.shadowBlur = 10;
    ctx.fillStyle = "#ccffcc";
    ctx.beginPath();
    ctx.arc(s.x, s.y, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // --- Projectiles ---
  for (const p of projectiles) {
    const alpha = Math.max(0.1, p.life / PROJ_LIFE);
    ctx.save();
    ctx.globalAlpha = alpha;
    if (p.type === "arrow") {
      // Rogue arrow — angled in direction of travel
      const arrowAngle = Math.atan2(p.vy, p.vx);
      ctx.translate(p.x, p.y);
      ctx.rotate(arrowAngle);
      // Shaft
      ctx.shadowColor = "#c8a020";
      ctx.shadowBlur = 6;
      ctx.strokeStyle = "#c8a96e";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(-14, 0);
      ctx.lineTo(8, 0);
      ctx.stroke();
      // Metal tip
      ctx.shadowBlur = 0;
      ctx.fillStyle = "#cccccc";
      ctx.beginPath();
      ctx.moveTo(14, 0);
      ctx.lineTo(7, -3);
      ctx.lineTo(7, 3);
      ctx.closePath();
      ctx.fill();
      // Fletching
      ctx.strokeStyle = "#993333";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-14, 0);
      ctx.lineTo(-9, -4);
      ctx.moveTo(-14, 0);
      ctx.lineTo(-9, 4);
      ctx.stroke();
    } else if (p.type === "rock") {
      // Ogre rock — chunky grey stone
      ctx.shadowColor = "#888866";
      ctx.shadowBlur = 8;
      // Main stone body
      ctx.fillStyle = "#888880";
      ctx.beginPath();
      ctx.ellipse(p.x, p.y, 10, 8, Math.atan2(p.vy, p.vx), 0, Math.PI * 2);
      ctx.fill();
      // Dark crack detail
      ctx.strokeStyle = "#555550";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(p.x - 3, p.y - 2);
      ctx.lineTo(p.x + 2, p.y + 3);
      ctx.stroke();
      // Highlight
      ctx.fillStyle = "rgba(255,255,255,0.25)";
      ctx.beginPath();
      ctx.ellipse(p.x - 3, p.y - 2, 4, 3, 0, 0, Math.PI * 2);
      ctx.fill();
    } else if (p.fromHag) {
      // Auntie Ethel's cursed bolt — sickly green
      ctx.shadowColor = "#44ff44";
      ctx.shadowBlur = 22;
      ctx.fillStyle = "#88ff44";
      ctx.beginPath();
      ctx.arc(p.x, p.y, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fill();
    } else if (p.isEnemy) {
      // Gnome projectile — orange
      ctx.shadowColor = "#ff8800";
      ctx.shadowBlur = 18;
      ctx.fillStyle = "#ffaa44";
      ctx.beginPath();
      ctx.arc(p.x, p.y, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Herb / Ogre projectile — purple bolt
      ctx.shadowColor = "#bb66ff";
      ctx.shadowBlur = 18;
      ctx.fillStyle = "#dd99ff";
      ctx.beginPath();
      ctx.arc(p.x, p.y, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  // Aiming line from sprite center toward mouse
  const angle = Math.atan2(mouseY - pcy, mouseX - pcx);
  ctx.strokeStyle = "rgba(255,255,255,0.8)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(pcx, pcy);
  ctx.lineTo(pcx + Math.cos(angle) * 20, pcy + Math.sin(angle) * 20);
  ctx.stroke();

  // --- Cursor ---
  const hovering = roomInteractables.some(
    (obj) =>
      mouseX >= obj.x &&
      mouseX <= obj.x + obj.w &&
      mouseY >= obj.y &&
      mouseY <= obj.y + obj.h,
  );

  if (hovering) {
    ctx.strokeStyle = "rgba(255,215,0,0.95)";
    ctx.fillStyle = "rgba(255,215,0,0.3)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(mouseX, mouseY - 14);
    ctx.lineTo(mouseX + 10, mouseY);
    ctx.lineTo(mouseX, mouseY + 14);
    ctx.lineTo(mouseX - 10, mouseY);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "rgba(255,215,0,0.95)";
    ctx.beginPath();
    ctx.arc(mouseX, mouseY, 2.5, 0, Math.PI * 2);
    ctx.fill();
  } else {
    ctx.strokeStyle = "rgba(255,255,255,0.85)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(mouseX - 12, mouseY);
    ctx.lineTo(mouseX + 12, mouseY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(mouseX, mouseY - 12);
    ctx.lineTo(mouseX, mouseY + 12);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(mouseX, mouseY, 4, 0, Math.PI * 2);
    ctx.stroke();
  }

  // --- HP Bar (top-right) ---
  const hpBarW = 200;
  const hpBarH = 18;
  const hpBarX = W - hpBarW - 16;
  const hpBarY = 14;
  ctx.fillStyle = "rgba(0,0,0,0.6)";
  ctx.fillRect(hpBarX - 4, hpBarY - 4, hpBarW + 8, hpBarH + 8);
  ctx.fillStyle = "#550000";
  ctx.fillRect(hpBarX, hpBarY, hpBarW, hpBarH);
  ctx.fillStyle = player.hp > player.maxHp * 0.3 ? "#dd2222" : "#ff6600";
  ctx.fillRect(hpBarX, hpBarY, hpBarW * (player.hp / player.maxHp), hpBarH);
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 11px monospace";
  ctx.textAlign = "center";
  ctx.fillText(
    `HP  ${player.hp} / ${player.maxHp}`,
    hpBarX + hpBarW / 2,
    hpBarY + 13,
  );
  ctx.textAlign = "left";

  // --- Choice dialogue ---
  if (choiceState.active) {
    const midX = W / 2;
    const boxY = H - 220;
    const boxH = 190;
    ctx.fillStyle = "rgba(10,10,30,0.92)";
    ctx.strokeStyle = "rgba(200,180,100,0.8)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(40, boxY, W - 80, boxH, 10);
    ctx.fill();
    ctx.stroke();
    ctx.textAlign = "center";
    ctx.fillStyle = "#ffffff";
    ctx.font = "18px Georgia, serif";
    choiceState.lines.forEach((line, i) => {
      ctx.fillText(line, midX, boxY + 38 + i * 28);
    });
    // Yes button
    ctx.fillStyle = "rgba(30,120,30,0.85)";
    ctx.beginPath();
    ctx.roundRect(midX - 160, boxY + 120, 140, 40, 6);
    ctx.fill();
    ctx.fillStyle = "#aaffaa";
    ctx.font = "bold 16px Georgia, serif";
    ctx.fillText("Yes — Save them", midX - 90, boxY + 146);
    // No button
    ctx.fillStyle = "rgba(120,30,30,0.85)";
    ctx.beginPath();
    ctx.roundRect(midX + 20, boxY + 120, 140, 40, 6);
    ctx.fill();
    ctx.fillStyle = "#ffaaaa";
    ctx.fillText("No — Leave", midX + 90, boxY + 146);
    ctx.textAlign = "left";
  }

  // --- Message bar ---
  if (messageFrames > 0) {
    const alpha = Math.min(1, messageFrames / 20);
    ctx.fillStyle = `rgba(0,0,0,${0.78 * alpha})`;
    ctx.fillRect(0, H - 56, W, 56);
    ctx.fillStyle = `rgba(255,220,120,${alpha})`;
    ctx.font = "15px Georgia, serif";
    ctx.fillText(activeMessage, 20, H - 20);
  }

  // --- Book of Lore overlay ---
  if (bookState.active) {
    const page = bookPages[bookState.page];
    if (page && page.complete && page.naturalWidth > 0) {
      ctx.drawImage(page, 0, 0, W, H);
    } else {
      // Fallback parchment while image loads
      ctx.fillStyle = "#1a0f05";
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "#c8a96e";
      ctx.font = "bold 26px Georgia, serif";
      ctx.textAlign = "center";
      ctx.fillText("Book of Lore", W / 2, H / 2);
      ctx.textAlign = "left";
    }
    // Navigation hint bar at bottom
    ctx.fillStyle = "rgba(0,0,0,0.72)";
    ctx.fillRect(0, H - 48, W, 48);
    ctx.fillStyle = "rgba(255,220,120,0.92)";
    ctx.font = "13px Georgia, serif";
    ctx.textAlign = "center";
    ctx.fillText(
      `Page ${bookState.page + 1} / ${bookPages.length}   ·   ← → or click to turn pages   ·   ESC to close`,
      W / 2,
      H - 16,
    );
    ctx.textAlign = "left";
  }

  // --- Map button (bottom-left, always visible in game rooms) ---
  if (ROOMS[currentRoom].type === "game") {
    const mapBtnHovered =
      mouseX >= MAP_BTN.x &&
      mouseX <= MAP_BTN.x + MAP_BTN.w &&
      mouseY >= MAP_BTN.y &&
      mouseY <= MAP_BTN.y + MAP_BTN.h;
    ctx.fillStyle = mapOpen
      ? "rgba(255,220,100,0.9)"
      : mapBtnHovered
        ? "rgba(255,255,255,0.25)"
        : "rgba(0,0,0,0.6)";
    ctx.beginPath();
    ctx.roundRect(MAP_BTN.x, MAP_BTN.y, MAP_BTN.w, MAP_BTN.h, 6);
    ctx.fill();
    ctx.strokeStyle = mapOpen ? "rgba(255,180,0,0.9)" : "rgba(255,255,255,0.5)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(MAP_BTN.x, MAP_BTN.y, MAP_BTN.w, MAP_BTN.h, 6);
    ctx.stroke();
    ctx.fillStyle = mapOpen ? "#332200" : "#ffffff";
    ctx.font = "bold 13px Georgia, serif";
    ctx.textAlign = "center";
    ctx.fillText("MAP", MAP_BTN.x + MAP_BTN.w / 2, MAP_BTN.y + 23);
    ctx.textAlign = "left";
  }

  // --- Map overlay ---
  if (mapOpen) {
    if (mapOverlayImage.complete && mapOverlayImage.naturalWidth > 0) {
      ctx.drawImage(mapOverlayImage, 0, 0, W, H);
    } else {
      ctx.fillStyle = "rgba(10,20,10,0.95)";
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "#88cc88";
      ctx.font = "bold 24px Georgia, serif";
      ctx.textAlign = "center";
      ctx.fillText("Map", W / 2, H / 2);
      ctx.textAlign = "left";
    }
    // Red player dot
    const dotPos = MAP_ROOM_POSITIONS[currentRoom];
    if (dotPos) {
      ctx.save();
      ctx.shadowColor = "#ff0000";
      ctx.shadowBlur = 12;
      ctx.fillStyle = "#ff3333";
      ctx.beginPath();
      ctx.arc(dotPos.x, dotPos.y, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(dotPos.x, dotPos.y, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    // Close hint
    ctx.fillStyle = "rgba(0,0,0,0.72)";
    ctx.fillRect(0, H - 48, W, 48);
    ctx.fillStyle = "rgba(255,220,120,0.92)";
    ctx.font = "13px Georgia, serif";
    ctx.textAlign = "center";
    ctx.fillText("Press M or click MAP to close", W / 2, H - 16);
    ctx.textAlign = "left";
  }

  // --- Coordinate overlay (handy for positioning triggers/interactables) ---
  ctx.fillStyle = "rgba(0,0,0,0.55)";
  ctx.fillRect(0, 0, 260, 46);
  ctx.fillStyle = "#aaffaa";
  ctx.font = "11px monospace";
  ctx.fillText(
    `player  x:${Math.round(player.x)}  y:${Math.round(player.y)}`,
    8,
    17,
  );
  ctx.fillText(
    `cursor  x:${Math.round(mouseX)}  y:${Math.round(mouseY)}  [${currentRoom}]`,
    8,
    36,
  );
}

// ============================================================
//  GAME LOOP
// ============================================================
function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

mapImages.control_page.onload = loop;
mapImages.control_page.onerror = loop;
