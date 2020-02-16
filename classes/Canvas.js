const canvas = {};

try {
  canvas = require("canvas");
} catch (e) {
  console.log(e);
}

const { createCanvas, Image } = canvas;

const ALIGN = {
  TOP_LEFT: 1,
  TOP_CENTER: 2,
  TOP_RIGHT: 3,
  CENTER_RIGHT: 4,
  BOTTOM_RIGHT: 5,
  BOTTOM_CENTER: 6,
  BOTTOM_LEFT: 7,
  CENTER_LEFT: 8,
  CENTER: 9
};

function measureText(ctx, font, text) {
  ctx.font = font;
  const measure = ctx.measureText(text);
  return {
    width: measure.width,
    height: measure.actualBoundingBoxAscent
  };
}

module.exports = class Canvas {
  static async ship(users, shipName, percent) {
    users = await Promise.all(users);

    const WIDTH = 420;
    const HEIGHT = 240;

    const avatarPictures = users.map(u => Image.from(u.profile));
    const IMAGE_ASSETS = Promise.all([
      Image.from(
        "https://cdn.glitch.com/068d4276-1b71-44b8-bd8e-c9448e211226%2Fdownload.svg?v=1570868755839"
      ),
      ...avatarPictures
    ]);

    const FONTS = (() => {
      const MEME = Math.random() > 0.99 && '"Comic Sans MS"';
      const EXTRABOLD = MEME || '"Montserrat ExtraBold"';
      const BLACK = MEME || '"Montserrat Black"';
      return {
        TITLE: `italic 27px ${EXTRABOLD}`,
        PERCENT: `italic 27px ${BLACK}`
      };
    })();

    const canvas = createCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext("2d");

    // Avatar background
    const AVATAR_BACKGROUND_RADIUS = 68;
    const AVATAR_SIZE = AVATAR_BACKGROUND_RADIUS * 1.84;
    const AVATAR_INNER_MARGIN = 122;
    const AVATAR_BACKGROUND_Y = HEIGHT * 0.57;
    const getAvatarXCord = i =>
      WIDTH * 0.5 +
      (i === 1 ? AVATAR_INNER_MARGIN : -Math.abs(AVATAR_INNER_MARGIN));

    users.forEach((user, i) => {
      ctx.fillStyle = user.document.favColor;
      ctx.circle(
        getAvatarXCord(i),
        AVATAR_BACKGROUND_Y,
        AVATAR_BACKGROUND_RADIUS,
        0,
        Math.PI * 2
      );
    });

    //  IMAGES
    const [heartIcon, ...avatarImages] = await IMAGE_ASSETS;

    // Avatars
    users.forEach((user, i) => {
      const AVATAR_X = getAvatarXCord(i) - AVATAR_SIZE * 0.5;
      const AVATAR_Y = AVATAR_BACKGROUND_Y - AVATAR_SIZE * 0.5;

      ctx.roundImage(
        avatarImages[i],
        AVATAR_X,
        AVATAR_Y,
        AVATAR_SIZE,
        AVATAR_SIZE
      );
    });

    // Heart
    const HEART_W = 88;
    const HEART_H = 81;
    const HEART_X = WIDTH * 0.5;
    const HEART_Y = AVATAR_BACKGROUND_Y;
    const HEART_COLOR = "#be1931";

    ctx.drawIcon(
      heartIcon,
      HEART_X - HEART_W * 0.5,
      HEART_Y - HEART_H * 0.5,
      HEART_W,
      HEART_H,
      HEART_COLOR
    );

    // Grey heart
    const HEART_GREY_COLOR = "#5c616b";
    ctx.globalCompositeOperation = "source-atop";

    const GREY_HEIGHT = (1 - percent / 100) * HEART_H;
    ctx.fillStyle = HEART_GREY_COLOR;
    ctx.fillRect(
      HEART_X - HEART_W * 0.5,
      HEART_Y - HEART_H * 0.5,
      100,
      GREY_HEIGHT
    );

    ctx.globalCompositeOperation = "source-over";
    // Percent
    ctx.fillStyle = "#fff";
    ctx.write(
      `${percent}%`,
      HEART_X,
      HEART_Y * 0.96,
      FONTS.PERCENT,
      ALIGN.CENTER
    );

    // Card Title
    const TITLE_X = WIDTH * 0.5;

    //  Title modal
    ctx.fillStyle = "#fff";
    const TITLE_RECT_X_MARGIN = 45;
    const TITLE_RECT_WIDTH =
      measureText(ctx, FONTS.TITLE, shipName).width + TITLE_RECT_X_MARGIN;
    const TITLE_RECT_HEIGHT = 37;
    const TITLE_RECT_Y = 28;
    const TITLE_RECT_X = TITLE_X - TITLE_RECT_WIDTH * 0.5;
    const TITLE_TEXT_MARGIN = TITLE_RECT_HEIGHT * 0.5;
    ctx.roundRect(
      TITLE_RECT_X,
      TITLE_RECT_Y,
      TITLE_RECT_WIDTH,
      TITLE_RECT_HEIGHT,
      20,
      true
    );
    //   Title text
    ctx.fillStyle = "#000000";
    ctx.write(
      shipName,
      TITLE_X,
      TITLE_RECT_Y + TITLE_TEXT_MARGIN,
      FONTS.TITLE,
      ALIGN.CENTER
    );

    return canvas.toBuffer();
  }
};
