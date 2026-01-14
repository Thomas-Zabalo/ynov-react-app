import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {oneDark} from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function MarkdownViewer({content}: { content: string }) {
    return (
        <div className="
            prose prose-slate dark:prose-invert max-w-none
            text-slate-900 dark:text-slate-100
            prose-headings:font-bold
            prose-p:leading-relaxed prose-p:mb-4
            prose-ul:list-disc prose-ul:pl-6 prose-ul:my-4 prose-ul:space-y-1
            prose-ol:list-decimal prose-ol:pl-6 prose-ol:my-4 prose-ol:space-y-1
            prose-li:text-gray-700 dark:prose-li:text-gray-300
            prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-a:underline hover:prose-a:text-indigo-700 dark:hover:prose-a:text-indigo-300
            prose-code:text-pink-600 dark:prose-code:text-pink-400
            prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md
        ">
            <Markdown
                remarkPlugins={[remarkGfm]}
                components={{
                    h1: ({...props}) => <h1 className="text-4xl font-extrabold mb-6 mt-8" {...props} />,
                    h2: ({...props}) => <h2
                        className="text-3xl font-bold mb-4 mt-6 border-b border-gray-200 dark:border-gray-700 pb-2" {...props} />,

                    ul: ({node, ...props}) => <ul className="list-disc pl-6 my-4 space-y-2" {...props} />,
                    ol: ({node, ...props}) => <ol className="list-decimal pl-6 my-4 space-y-2" {...props} />,
                    li: ({node, ...props}) => <li className="text-gray-700 dark:text-gray-300" {...props} />,

                    a: ({node, ...props}) => (
                        <a
                            {...props}
                            className="text-indigo-600 dark:text-indigo-400 underline underline-offset-4 decoration-indigo-500/30 hover:decoration-indigo-500 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                        />
                    ),

                    blockquote: ({children, ...props}) => (
                        <blockquote
                            className="
            border-l-4 border-indigo-500
            bg-indigo-50/50 dark:bg-indigo-900/10
            italic my-6 py-2 px-6
            rounded-r-lg
            /* On cible les paragraphes et listes à l'intérieur */
            [&>p]:mb-0 [&>ul]:my-2
        "
                            {...props}
                        >
                            {children}
                        </blockquote>),

                    code({node, className, children, ...props}) {
                        const match = /language-(\w+)/.exec(className || '');
                        return match ? (
                            <SyntaxHighlighter
                                language={match[1]}
                                style={oneDark}
                                customStyle={{
                                    borderRadius: '0.5rem',
                                    padding: '1rem',
                                    fontSize: '0.875rem',
                                    overflowX: 'auto',
                                    backgroundColor: '#282C34'
                                }}
                                // @ts-ignore
                                PreTag="div"
                            >
                                {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                        ) : (
                            <code className={className} {...props}>
                                {children}
                            </code>
                        );
                    },

                    table: ({children, ...props}) => (
                        <div
                            className="overflow-x-auto my-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700" {...props}>
                                {children}
                            </table>
                        </div>
                    ),
                    thead: ({children, ...props}) => (
                        <thead className="bg-gray-50 dark:bg-gray-800" {...props}>{children}</thead>
                    ),
                    tbody: ({children, ...props}) => (
                        <tbody
                            className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700" {...props}>{children}</tbody>
                    ),
                    tr: ({children, ...props}) => (
                        <tr className="even:bg-gray-50/50 dark:even:bg-gray-800/50" {...props}>{children}</tr>
                    ),
                    th: ({children, ...props}) => (
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider" {...props}>{children}</th>
                    ),
                    td: ({children, ...props}) => (
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200" {...props}>{children}</td>
                    )
                }}
            >
                {content}
            </Markdown>
        </div>
    );
}