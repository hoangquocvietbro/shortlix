import { decimal } from "drizzle-orm/mysql-core";
import { boolean, integer, json, pgTable, serial, timestamp, varchar,numeric } from "drizzle-orm/pg-core";

export const Users = pgTable('users', {
  id: serial("id").primaryKey(),
  pi_username: varchar('pi_username'),
  name: varchar("name", { length: 255 }),
  email: varchar("email"),
  imageUrl: varchar("imageUrl"),
  subscription: boolean("subscription").default(false),
  credits: integer("credits").default(30),
});
export const ImageData = pgTable('imageData', {
  id: serial("id").primaryKey(),
  imagePrompt: varchar("imagePrompt", { length: 255 }).notNull(),
  imageBase64: varchar("imageBase64").notNull(),
});
export const VideoData = pgTable('videoData', {
  id: serial("id").primaryKey(),
  script: json("script").notNull(),
  audioFileUrl: varchar("audioFileUrl").array(),
  captions: json("captions"),
  captionsList: json("captionsList"),
  imageList: varchar("imageList").array(),
  createdBy: varchar("createdBy").notNull(),
  downloadUrl: varchar("downloadUrl"),
  animationType: varchar('animationType'),
  captionPosition: varchar('captionPosition'),
  captionColor: varchar('captionColor'),
  captionSize: varchar('captionSize'),
  captionFont: varchar('captionFont').default(50),
  showCaptions: boolean('showCaptions').default(true),
  captionBold: boolean('captionBold'),
  captionItalic: boolean('captionItalic'),
  captionUppercase: boolean('captionUppercase'),
  width:integer('width').default(720),
  height:integer('height').default(1280),
  languageCode: varchar("languageCode"),
  ssmlGender: varchar("ssmlGender"),
  rate: numeric("rate").default(0),
  pitch: numeric("pitch").default(0),
});
export const Voices = pgTable("voices", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull(), // Reference to the user who generated the voice
  audioUrl: varchar("audio_url").notNull(), // URL of the audio in Firebase Storage
  language: varchar("language"), // Language of the voice
  gender: varchar("gender"), // Gender of the voice
  voiceTitle: varchar("voiceTitle"), // Title of the voice
  rate: numeric("rate").default(0),
  pitch: numeric("pitch").default(0),
  createdAt: timestamp("created_at").defaultNow(), // Timestamp when the voice was generated
  updatedAt: timestamp("updated_at").defaultNow(), // Timestamp for last update
});

