import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

const renderingPipeline = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeSanitize)
  .use(rehypeStringify);

const Markdown = {
  render(markdown: string) {
    return renderingPipeline.processSync(markdown).toString();
  },
};

export default Markdown;
