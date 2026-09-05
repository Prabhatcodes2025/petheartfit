import { isRichBlogHtml, plainTextToHtml, sanitizeBlogHtml } from '../lib/blog-content'

export function BlogContent({content}:{content:string|string[]}){
 const source=Array.isArray(content)?content.join('\n\n'):content
 const html=sanitizeBlogHtml(isRichBlogHtml(source)?source:plainTextToHtml(source))
 return <div className="article-rich" dangerouslySetInnerHTML={{__html:html}}/>
}
