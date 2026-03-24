import { useRef } from 'react';
import { 
  Bold, 
  Italic, 
  Heading1, 
  Heading2, 
  Code, 
  Quote, 
  List, 
  ListOrdered, 
  Link as LinkIcon, 
  Image as ImageIcon,
  Upload
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ 
  value, 
  onChange, 
  placeholder = '开始写作...' 
}: RichTextEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertText = (before: string, after = '', placeholderText = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end) || placeholderText;
    
    const newText = 
      value.substring(0, start) + 
      before + 
      selectedText + 
      after + 
      value.substring(end);
    
    onChange(newText);
    
    // 恢复光标位置
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + before.length + selectedText.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const handleBold = () => insertText('**', '**', '粗体文本');
  const handleItalic = () => insertText('*', '*', '斜体文本');
  const handleHeading1 = () => insertText('# ', '', '标题 1');
  const handleHeading2 = () => insertText('## ', '', '标题 2');
  const handleCode = () => insertText('`', '`', '代码');
  const handleCodeBlock = () => insertText('```\n', '\n```', '代码块');
  const handleQuote = () => insertText('> ', '', '引用内容');
  const handleList = () => insertText('- ', '', '列表项');
  const handleListOrdered = () => insertText('1. ', '', '列表项');
  
  const handleLink = () => {
    const url = prompt('请输入链接地址:');
    if (url) {
      insertText('[', `](${url})`, '链接文本');
    }
  };

  const handleImage = () => {
    const url = prompt('请输入图片 URL 地址:');
    if (url) {
      insertText('![', `](${url})`, '图片描述');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('请上传图片文件');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('图片大小不能超过 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      insertText('![', `](${result})`, '图片描述');
    };
    reader.onerror = () => {
      alert('文件读取失败，请重试');
    };
    reader.readAsDataURL(file);
    
    // 清空 input 以便下次上传
    e.target.value = '';
  };

  return (
    <div className="border border-[#8c8c91]/30 rounded-lg overflow-hidden bg-transparent">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-[#8c8c91]/30 bg-[#1a1a1a]/50">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleBold}
          className="h-8 w-8 p-0 text-[#8c8c91] hover:text-[#f0f0f0] hover:bg-[#8c8c91]/20"
          title="加粗"
        >
          <Bold className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleItalic}
          className="h-8 w-8 p-0 text-[#8c8c91] hover:text-[#f0f0f0] hover:bg-[#8c8c91]/20"
          title="斜体"
        >
          <Italic className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleHeading1}
          className="h-8 w-8 p-0 text-[#8c8c91] hover:text-[#f0f0f0] hover:bg-[#8c8c91]/20"
          title="标题 1"
        >
          <Heading1 className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleHeading2}
          className="h-8 w-8 p-0 text-[#8c8c91] hover:text-[#f0f0f0] hover:bg-[#8c8c91]/20"
          title="标题 2"
        >
          <Heading2 className="w-4 h-4" />
        </Button>
        <div className="w-px h-6 bg-[#8c8c91]/30 mx-1" />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleCode}
          className="h-8 w-8 p-0 text-[#8c8c91] hover:text-[#f0f0f0] hover:bg-[#8c8c91]/20"
          title="行内代码"
        >
          <Code className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleCodeBlock}
          className="h-8 w-8 p-0 text-[#8c8c91] hover:text-[#f0f0f0] hover:bg-[#8c8c91]/20"
          title="代码块"
        >
          <Code className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleQuote}
          className="h-8 w-8 p-0 text-[#8c8c91] hover:text-[#f0f0f0] hover:bg-[#8c8c91]/20"
          title="引用"
        >
          <Quote className="w-4 h-4" />
        </Button>
        <div className="w-px h-6 bg-[#8c8c91]/30 mx-1" />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleList}
          className="h-8 w-8 p-0 text-[#8c8c91] hover:text-[#f0f0f0] hover:bg-[#8c8c91]/20"
          title="无序列表"
        >
          <List className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleListOrdered}
          className="h-8 w-8 p-0 text-[#8c8c91] hover:text-[#f0f0f0] hover:bg-[#8c8c91]/20"
          title="有序列表"
        >
          <ListOrdered className="w-4 h-4" />
        </Button>
        <div className="w-px h-6 bg-[#8c8c91]/30 mx-1" />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleLink}
          className="h-8 w-8 p-0 text-[#8c8c91] hover:text-[#f0f0f0] hover:bg-[#8c8c91]/20"
          title="插入链接"
        >
          <LinkIcon className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleImage}
          className="h-8 w-8 p-0 text-[#8c8c91] hover:text-[#f0f0f0] hover:bg-[#8c8c91]/20"
          title="插入图片 URL"
        >
          <ImageIcon className="w-4 h-4" />
        </Button>
        <label className="h-8 w-8 flex items-center justify-center cursor-pointer text-[#8c8c91] hover:text-[#f0f0f0] hover:bg-[#8c8c91]/20 rounded transition-colors">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <Upload className="w-4 h-4" />
          <span className="sr-only">上传图片</span>
        </label>
      </div>

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full min-h-[500px] p-4 bg-transparent text-[#f0f0f0] placeholder:text-[#8c8c91]/50 resize-none focus:outline-none font-mono text-sm leading-relaxed"
      />
    </div>
  );
}