import { serial, text, pgTable, timestamp, numeric, integer, boolean, pgEnum } from 'drizzle-orm/pg-core';

// Enums for various categories
export const interactionActionEnum = pgEnum('interaction_action', [
  'stream_start', 
  'stream_stop', 
  'podcast_play', 
  'ondemand_play', 
  'schedule_view', 
  'merch_view'
]);

export const directoryCategoryEnum = pgEnum('directory_category', [
  'radio_directory',
  'app_store', 
  'browser_extension',
  'voice_assistant'
]);

// Station information table
export const stationInfoTable = pgTable('station_info', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  websiteUrl: text('website_url').notNull(),
  streamUrl: text('stream_url').notNull(),
  m3uUrl: text('m3u_url').notNull(),
  plsUrl: text('pls_url').notNull(),
  logoUrl: text('logo_url'),
  genre: text('genre').notNull(),
  language: text('language').notNull(),
  country: text('country').notNull(),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Stream status table for real-time stream information
export const streamStatusTable = pgTable('stream_status', {
  id: serial('id').primaryKey(),
  isLive: boolean('is_live').notNull().default(false),
  currentTrack: text('current_track'),
  currentArtist: text('current_artist'),
  listenerCount: integer('listener_count').notNull().default(0),
  bitrate: integer('bitrate').notNull().default(256),
  format: text('format').notNull().default('MP3'),
  streamUrl: text('stream_url').notNull(),
  lastUpdated: timestamp('last_updated').defaultNow().notNull(),
});

// Schedule entries table
export const scheduleEntriesTable = pgTable('schedule_entries', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  startTime: timestamp('start_time').notNull(),
  endTime: timestamp('end_time').notNull(),
  djName: text('dj_name'),
  genre: text('genre'),
  isLive: boolean('is_live').notNull().default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Podcast episodes table
export const podcastEpisodesTable = pgTable('podcast_episodes', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  audioUrl: text('audio_url').notNull(),
  duration: integer('duration'), // Duration in seconds
  publishDate: timestamp('publish_date').notNull(),
  downloadCount: integer('download_count').notNull().default(0),
  thumbnailUrl: text('thumbnail_url'),
  isAvailable: boolean('is_available').notNull().default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// On-demand content table
export const onDemandContentTable = pgTable('on_demand_content', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  artist: text('artist'),
  audioUrl: text('audio_url').notNull(),
  duration: integer('duration'), // Duration in seconds
  genre: text('genre'),
  releaseDate: timestamp('release_date'),
  playCount: integer('play_count').notNull().default(0),
  thumbnailUrl: text('thumbnail_url'),
  isAvailable: boolean('is_available').notNull().default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Directory listings table
export const directoryListingsTable = pgTable('directory_listings', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  url: text('url').notNull(),
  description: text('description'),
  category: directoryCategoryEnum('category').notNull(),
  isActive: boolean('is_active').notNull().default(true),
  priority: integer('priority').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Merchandise items table
export const merchandiseItemsTable = pgTable('merchandise_items', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  currency: text('currency').notNull().default('EUR'),
  imageUrl: text('image_url'),
  shopUrl: text('shop_url').notNull(),
  category: text('category'),
  isAvailable: boolean('is_available').notNull().default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// User interactions table for analytics
export const userInteractionsTable = pgTable('user_interactions', {
  id: serial('id').primaryKey(),
  sessionId: text('session_id').notNull(),
  action: interactionActionEnum('action').notNull(),
  contentId: text('content_id'),
  duration: integer('duration'), // Duration in seconds
  userAgent: text('user_agent'),
  ipAddress: text('ip_address'),
  timestamp: timestamp('timestamp').defaultNow().notNull(),
});

// TypeScript types for the table schemas
export type StationInfo = typeof stationInfoTable.$inferSelect;
export type NewStationInfo = typeof stationInfoTable.$inferInsert;

export type StreamStatus = typeof streamStatusTable.$inferSelect;
export type NewStreamStatus = typeof streamStatusTable.$inferInsert;

export type ScheduleEntry = typeof scheduleEntriesTable.$inferSelect;
export type NewScheduleEntry = typeof scheduleEntriesTable.$inferInsert;

export type PodcastEpisode = typeof podcastEpisodesTable.$inferSelect;
export type NewPodcastEpisode = typeof podcastEpisodesTable.$inferInsert;

export type OnDemandContent = typeof onDemandContentTable.$inferSelect;
export type NewOnDemandContent = typeof onDemandContentTable.$inferInsert;

export type DirectoryListing = typeof directoryListingsTable.$inferSelect;
export type NewDirectoryListing = typeof directoryListingsTable.$inferInsert;

export type MerchandiseItem = typeof merchandiseItemsTable.$inferSelect;
export type NewMerchandiseItem = typeof merchandiseItemsTable.$inferInsert;

export type UserInteraction = typeof userInteractionsTable.$inferSelect;
export type NewUserInteraction = typeof userInteractionsTable.$inferInsert;

// Export all tables for relation queries
export const tables = {
  stationInfo: stationInfoTable,
  streamStatus: streamStatusTable,
  scheduleEntries: scheduleEntriesTable,
  podcastEpisodes: podcastEpisodesTable,
  onDemandContent: onDemandContentTable,
  directoryListings: directoryListingsTable,
  merchandiseItems: merchandiseItemsTable,
  userInteractions: userInteractionsTable,
};