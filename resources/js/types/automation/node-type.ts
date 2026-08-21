export const NodeType = {
    Trigger: 'trigger',
    Generate: 'generate',
    GeneratePoster: 'generate_poster',
    Delay: 'delay',
    Condition: 'condition',
    Publish: 'publish',
    Webhook: 'webhook',
    End: 'end',
    FetchRss: 'fetch_rss',
    HttpRequest: 'http_request',
} as const;

export type NodeTypeValue = (typeof NodeType)[keyof typeof NodeType];
