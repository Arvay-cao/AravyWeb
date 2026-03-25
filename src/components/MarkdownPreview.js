import { jsx as _jsx } from "react/jsx-runtime";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
export default function MarkdownPreview({ content }) {
    return (_jsx("div", { className: "markdown-preview prose prose-invert max-w-none", children: _jsx(ReactMarkdown, { remarkPlugins: [remarkGfm], components: {
                h1: ({ node, ...props }) => (_jsx("h1", { className: "text-3xl font-light text-[#f0f0f0] mt-8 mb-4", ...props })),
                h2: ({ node, ...props }) => (_jsx("h2", { className: "text-2xl font-light text-[#f0f0f0] mt-6 mb-3", ...props })),
                h3: ({ node, ...props }) => (_jsx("h3", { className: "text-xl font-light text-[#f0f0f0] mt-5 mb-2", ...props })),
                p: ({ node, ...props }) => (_jsx("p", { className: "text-[#c0c0c0] leading-relaxed mb-4", ...props })),
                strong: ({ node, ...props }) => (_jsx("strong", { className: "font-semibold text-[#f0f0f0]", ...props })),
                em: ({ node, ...props }) => (_jsx("em", { className: "italic text-[#c0c0c0]", ...props })),
                a: ({ node, ...props }) => (_jsx("a", { className: "text-[#8c8c91] hover:text-[#f0f0f0] underline decoration-[#8c8c91]/50 hover:decoration-[#f0f0f0]", target: "_blank", rel: "noopener noreferrer", ...props })),
                img: ({ node, src, alt, ...props }) => {
                    // 如果 src 为空，不渲染图片元素（静默处理，不打印警告）
                    if (!src || src.trim() === '') {
                        return null;
                    }
                    // 处理 Base64 图片
                    const isBase64 = src.startsWith('data:image');
                    // 检查 Base64 格式是否正确
                    if (isBase64) {
                        const base64Pattern = /^data:image\/(png|jpg|jpeg|gif|webp|svg\+xml);base64,/;
                        if (!base64Pattern.test(src)) {
                            console.error('Base64 图片格式不正确:', src.substring(0, 50) + '...');
                            return (_jsx("div", { className: "my-4 p-4 bg-red-500/10 border border-red-500/30 rounded text-red-400 text-sm", children: "\u56FE\u7247\u683C\u5F0F\u9519\u8BEF\uFF1ABase64 \u5934\u4FE1\u606F\u4E0D\u6B63\u786E" }));
                        }
                        console.log('Base64 图片格式正确，长度:', src.length, 'alt:', alt || '未知');
                    }
                    return (_jsx("div", { className: "my-4", children: _jsx("img", { src: src, alt: alt || '图片', className: "rounded-lg max-w-full h-auto block", onLoad: () => {
                                console.log('✅ 图片加载成功:', isBase64 ? 'Base64 图片' : src);
                            }, onError: (e) => {
                                const imgElement = e.target;
                                console.error('❌ 图片加载失败:', {
                                    src: isBase64 ? 'Base64 (' + src.length + ' 字符)' : src,
                                    alt: alt || '未知',
                                    isBase64: isBase64,
                                    error: e.nativeEvent
                                });
                                // 不隐藏图片，保留显示
                                // imgElement.style.display = 'none';
                                // 创建错误提示
                                const errorDiv = document.createElement('div');
                                errorDiv.className = 'text-red-500 text-sm p-2 bg-red-100/10 rounded mt-2';
                                errorDiv.textContent = `图片加载失败：${alt || '未知图片'}`;
                                imgElement.parentElement?.appendChild(errorDiv);
                            }, ...props }) }));
                },
                blockquote: ({ node, ...props }) => (_jsx("blockquote", { className: "border-l-4 border-[#8c8c91] pl-4 py-2 my-4 text-[#8c8c91] italic bg-[#1a1a1a]/30 rounded-r", ...props })),
                ul: ({ node, ...props }) => (_jsx("ul", { className: "list-disc list-inside space-y-2 mb-4 text-[#c0c0c0]", ...props })),
                ol: ({ node, ...props }) => (_jsx("ol", { className: "list-decimal list-inside space-y-2 mb-4 text-[#c0c0c0]", ...props })),
                li: ({ node, ...props }) => (_jsx("li", { className: "pl-1", ...props })),
                code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (_jsx(SyntaxHighlighter, { style: oneDark, language: match[1], PreTag: "div", className: "rounded-lg my-4 !bg-[#1a1a1a] !p-4 overflow-x-auto", ...props, children: String(children).replace(/\n$/, '') })) : (_jsx("code", { className: "bg-[#1a1a1a] px-2 py-1 rounded text-sm font-mono text-[#f0f0f0]", ...props, children: children }));
                },
                hr: ({ node, ...props }) => (_jsx("hr", { className: "border-[#8c8c91]/30 my-8", ...props })),
                table: ({ node, ...props }) => (_jsx("div", { className: "overflow-x-auto my-4", children: _jsx("table", { className: "min-w-full border-collapse", ...props }) })),
                th: ({ node, ...props }) => (_jsx("th", { className: "border border-[#8c8c91]/30 px-4 py-2 bg-[#1a1a1a] text-[#f0f0f0] font-medium", ...props })),
                td: ({ node, ...props }) => (_jsx("td", { className: "border border-[#8c8c91]/30 px-4 py-2 text-[#c0c0c0]", ...props })),
            }, children: content }) }));
}
