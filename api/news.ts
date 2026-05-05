export default function handler(_req: Request) {
  return new Response(
    JSON.stringify({
      articles: [
        {
          title: 'Ocean freight planning remains important for resilient supply chains',
          source: 'Globelink News Desk',
          date: 'Latest update',
          summary: 'Freight teams continue to monitor schedules, port conditions, and consolidation options to keep international cargo planning reliable.',
          url: 'https://www.freightwaves.com/',
        },
        {
          title: 'LCL consolidation helps shippers manage smaller cargo volumes',
          source: 'Logistics Insight',
          date: 'Latest update',
          summary: 'Less-than-container-load services remain useful for businesses that need flexible routing without waiting to fill a full container.',
          url: 'https://www.joc.com/',
        },
        {
          title: 'Warehouse and CFS support improve cargo handling visibility',
          source: 'Supply Chain Brief',
          date: 'Latest update',
          summary: 'Container freight station support can improve documentation, cargo preparation, labeling, and operational coordination before shipment.',
          url: 'https://www.supplychaindive.com/',
        },
      ],
    }),
    { headers: { 'content-type': 'application/json; charset=utf-8' } },
  );
}
