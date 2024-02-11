type HTMLQueryId = `#${string}`;
type HTMLQueryClass = `.${string}`;
type HTMLQueryTag = `${string}`;
type HTMLQuery = HTMLQueryId | HTMLQueryClass | HTMLQueryTag;

export type { HTMLQueryId, HTMLQueryClass, HTMLQueryTag, HTMLQuery };
