import { boolean, integer, json, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const Users = pgTable('users', {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email").notNull(),
  imageUrl: varchar("imageUrl").notNull(),
  subscription: boolean("subscription").default(false),
  credits: integer("credits").default(30)
});
export const ImageData = pgTable('imageData', {
  id: serial("id").primaryKey(),
  imagePrompt: varchar("imagePrompt", { length: 255 }).notNull(),
  imageBase64: varchar("imageBase64").notNull(),
});
export const VideoData = pgTable('videoData', {
  id: serial("id").primaryKey(),
  script: json("script").notNull(),
  audioFileUrl: varchar("audioFileUrl").notNull(),
  captions: json("captions").notNull(),
  imageList: varchar("imageList").array(),
  createdBy: varchar("createdBy").notNull(),
  downloadUrl: varchar("downloadUrl"),

});
export const Voices = pgTable("voices", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull(), // Reference to the user who generated the voice
  audioUrl: varchar("audio_url").notNull(), // URL of the audio in Firebase Storage
  language: varchar("language"), // Language of the voice
  gender: varchar("gender"), // Gender of the voice
  voiceTitle: varchar("voiceTitle"), // Title of the voice
  createdAt: timestamp("created_at").defaultNow(), // Timestamp when the voice was generated
  updatedAt: timestamp("updated_at").defaultNow(), // Timestamp for last update

});

