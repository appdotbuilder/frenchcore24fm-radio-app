import { z } from 'zod';

// Stream status and metadata schemas
export const streamStatusSchema = z.object({
  isLive: z.boolean(),
  currentTrack: z.string().nullable(),
  currentArtist: z.string().nullable(),
  listenerCount: z.number().int().nonnegative(),
  bitrate: z.number().int().default(256),
  format: z.string().default('MP3'),
  streamUrl: z.string().url(),
  lastUpdated: z.coerce.date()
});

export type StreamStatus = z.infer<typeof streamStatusSchema>;

// Radio station information schema
export const stationInfoSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  websiteUrl: z.string().url(),
  streamUrl: z.string().url(),
  m3uUrl: z.string().url(),
  plsUrl: z.string().url(),
  logoUrl: z.string().url().nullable(),
  genre: z.string(),
  language: z.string(),
  country: z.string(),
  isActive: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
});

export type StationInfo = z.infer<typeof stationInfoSchema>;

// Schedule entry schema
export const scheduleEntrySchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  djName: z.string().nullable(),
  genre: z.string().nullable(),
  isLive: z.boolean(),
  createdAt: z.coerce.date()
});

export type ScheduleEntry = z.infer<typeof scheduleEntrySchema>;

// Podcast episode schema
export const podcastEpisodeSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  audioUrl: z.string().url(),
  duration: z.number().int().nonnegative().nullable(),
  publishDate: z.coerce.date(),
  downloadCount: z.number().int().nonnegative().default(0),
  thumbnailUrl: z.string().url().nullable(),
  isAvailable: z.boolean(),
  createdAt: z.coerce.date()
});

export type PodcastEpisode = z.infer<typeof podcastEpisodeSchema>;

// On-demand content schema
export const onDemandContentSchema = z.object({
  id: z.number(),
  title: z.string(),
  artist: z.string().nullable(),
  audioUrl: z.string().url(),
  duration: z.number().int().nonnegative().nullable(),
  genre: z.string().nullable(),
  releaseDate: z.coerce.date().nullable(),
  playCount: z.number().int().nonnegative().default(0),
  thumbnailUrl: z.string().url().nullable(),
  isAvailable: z.boolean(),
  createdAt: z.coerce.date()
});

export type OnDemandContent = z.infer<typeof onDemandContentSchema>;

// Directory listing schema
export const directoryListingSchema = z.object({
  id: z.number(),
  name: z.string(),
  url: z.string().url(),
  description: z.string().nullable(),
  category: z.enum(['radio_directory', 'app_store', 'browser_extension', 'voice_assistant']),
  isActive: z.boolean(),
  priority: z.number().int().nonnegative().default(0),
  createdAt: z.coerce.date()
});

export type DirectoryListing = z.infer<typeof directoryListingSchema>;

// Merchandise item schema
export const merchandiseItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  price: z.number().positive(),
  currency: z.string().default('EUR'),
  imageUrl: z.string().url().nullable(),
  shopUrl: z.string().url(),
  category: z.string().nullable(),
  isAvailable: z.boolean(),
  createdAt: z.coerce.date()
});

export type MerchandiseItem = z.infer<typeof merchandiseItemSchema>;

// User interaction/analytics schema
export const userInteractionSchema = z.object({
  id: z.number(),
  sessionId: z.string(),
  action: z.enum(['stream_start', 'stream_stop', 'podcast_play', 'ondemand_play', 'schedule_view', 'merch_view']),
  contentId: z.string().nullable(),
  duration: z.number().int().nonnegative().nullable(),
  userAgent: z.string().nullable(),
  ipAddress: z.string().nullable(),
  timestamp: z.coerce.date()
});

export type UserInteraction = z.infer<typeof userInteractionSchema>;

// Input schemas for creating/updating content

export const createScheduleEntryInputSchema = z.object({
  title: z.string(),
  description: z.string().nullable(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  djName: z.string().nullable(),
  genre: z.string().nullable(),
  isLive: z.boolean()
});

export type CreateScheduleEntryInput = z.infer<typeof createScheduleEntryInputSchema>;

export const updateStreamStatusInputSchema = z.object({
  isLive: z.boolean(),
  currentTrack: z.string().nullable(),
  currentArtist: z.string().nullable(),
  listenerCount: z.number().int().nonnegative(),
  bitrate: z.number().int().optional(),
  format: z.string().optional(),
  streamUrl: z.string().url()
});

export type UpdateStreamStatusInput = z.infer<typeof updateStreamStatusInputSchema>;

export const createUserInteractionInputSchema = z.object({
  sessionId: z.string(),
  action: z.enum(['stream_start', 'stream_stop', 'podcast_play', 'ondemand_play', 'schedule_view', 'merch_view']),
  contentId: z.string().nullable(),
  duration: z.number().int().nonnegative().nullable(),
  userAgent: z.string().nullable(),
  ipAddress: z.string().nullable()
});

export type CreateUserInteractionInput = z.infer<typeof createUserInteractionInputSchema>;

// Query input schemas
export const getScheduleInputSchema = z.object({
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  limit: z.number().int().positive().max(100).default(50)
});

export type GetScheduleInput = z.infer<typeof getScheduleInputSchema>;

export const getPodcastsInputSchema = z.object({
  limit: z.number().int().positive().max(100).default(20),
  offset: z.number().int().nonnegative().default(0)
});

export type GetPodcastsInput = z.infer<typeof getPodcastsInputSchema>;

export const getOnDemandContentInputSchema = z.object({
  genre: z.string().optional(),
  limit: z.number().int().positive().max(100).default(20),
  offset: z.number().int().nonnegative().default(0)
});

export type GetOnDemandContentInput = z.infer<typeof getOnDemandContentInputSchema>;