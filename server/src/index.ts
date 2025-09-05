import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import 'dotenv/config';
import cors from 'cors';
import superjson from 'superjson';

// Import schemas
import { 
  updateStreamStatusInputSchema, 
  createScheduleEntryInputSchema, 
  getScheduleInputSchema,
  getPodcastsInputSchema,
  getOnDemandContentInputSchema,
  createUserInteractionInputSchema
} from './schema';

// Import handlers
import { getStreamStatus } from './handlers/get_stream_status';
import { updateStreamStatus } from './handlers/update_stream_status';
import { getStationInfo } from './handlers/get_station_info';
import { getSchedule } from './handlers/get_schedule';
import { createScheduleEntry } from './handlers/create_schedule_entry';
import { getPodcasts } from './handlers/get_podcasts';
import { getOnDemandContent } from './handlers/get_on_demand_content';
import { getDirectoryListings } from './handlers/get_directory_listings';
import { getMerchandise } from './handlers/get_merchandise';
import { trackUserInteraction } from './handlers/track_user_interaction';
import { getPlaylistFormats } from './handlers/get_playlist_formats';
import { scrapeHomepageData } from './handlers/scrape_homepage_data';

const t = initTRPC.create({
  transformer: superjson,
});

const publicProcedure = t.procedure;
const router = t.router;

const appRouter = router({
  // Health check endpoint
  healthcheck: publicProcedure.query(() => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }),

  // Stream management endpoints
  getStreamStatus: publicProcedure
    .query(() => getStreamStatus()),

  updateStreamStatus: publicProcedure
    .input(updateStreamStatusInputSchema)
    .mutation(({ input }) => updateStreamStatus(input)),

  // Station information endpoints
  getStationInfo: publicProcedure
    .query(() => getStationInfo()),

  // Schedule management endpoints
  getSchedule: publicProcedure
    .input(getScheduleInputSchema)
    .query(({ input }) => getSchedule(input)),

  createScheduleEntry: publicProcedure
    .input(createScheduleEntryInputSchema)
    .mutation(({ input }) => createScheduleEntry(input)),

  // Podcast endpoints
  getPodcasts: publicProcedure
    .input(getPodcastsInputSchema)
    .query(({ input }) => getPodcasts(input)),

  // On-demand content endpoints
  getOnDemandContent: publicProcedure
    .input(getOnDemandContentInputSchema)
    .query(({ input }) => getOnDemandContent(input)),

  // Directory and external links endpoints
  getDirectoryListings: publicProcedure
    .query(() => getDirectoryListings()),

  // Merchandise endpoints
  getMerchandise: publicProcedure
    .query(() => getMerchandise()),

  // Analytics endpoints
  trackUserInteraction: publicProcedure
    .input(createUserInteractionInputSchema)
    .mutation(({ input }) => trackUserInteraction(input)),

  // Playlist format endpoints
  getPlaylistFormats: publicProcedure
    .query(() => getPlaylistFormats()),

  // Homepage data scraping endpoints
  scrapeHomepageData: publicProcedure
    .query(() => scrapeHomepageData()),
});

export type AppRouter = typeof appRouter;

async function start() {
  const port = process.env['SERVER_PORT'] || 2022;
  const server = createHTTPServer({
    middleware: (req, res, next) => {
      cors({
        origin: true,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
      })(req, res, next);
    },
    router: appRouter,
    createContext() {
      return {};
    },
  });
  
  server.listen(port);
  console.log(`🎵 Frenchcore24FM TRPC Server listening on port: ${port}`);
  console.log(`🚀 Ready to serve high-quality streaming data and radio metadata`);
}

start().catch(console.error);