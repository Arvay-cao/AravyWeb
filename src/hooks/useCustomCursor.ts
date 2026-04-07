import { useEffect, useRef } from 'react';

export const useCustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);
  const isHovering = useRef(false);
  const isVisible = useRef(true);

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    console.log('[useCustomCursor] Is touch device:', isTouchDevice);
    if (isTouchDevice) {
      console.log('[useCustomCursor] Touch device detected, skipping cursor creation');
      return;
    }

    console.log('[useCustomCursor] Creating cursor element');
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    // 添加过渡效果，让光标消失和出现更平滑
    cursor.style.transition = 'opacity 0.3s ease, transform 0.15s ease';
    // 强制设置关键样式以确保可见性
    cursor.style.position = 'fixed';
    cursor.style.width = '12px';
    cursor.style.height = '12px';
    cursor.style.background = 'white';
    cursor.style.borderRadius = '50%';
    cursor.style.pointerEvents = 'none';
    cursor.style.zIndex = '9999';
    cursor.style.mixBlendMode = 'difference';
    cursor.style.transform = 'translate(-50%, -50%)';
    document.body.appendChild(cursor);
    cursorRef.current = cursor;
    console.log('[useCustomCursor] Cursor element created and appended to body', cursor);

    const animate = () => {
      if (isVisible.current) {
        // 只在光标可见时更新位置
        const dx = mousePos.current.x - cursorPos.current.x;
        const dy = mousePos.current.y - cursorPos.current.y;
        
        // 使用更高的缓动系数，让光标更紧跟鼠标
        cursorPos.current.x += dx * 0.35;
        cursorPos.current.y += dy * 0.35;

        if (cursorRef.current) {
          cursorRef.current.style.left = `${cursorPos.current.x}px`;
          cursorRef.current.style.top = `${cursorPos.current.y}px`;
          cursorRef.current.style.opacity = '1';
        }
      }

      rafId.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      // 如果光标与鼠标距离太远，立即更新位置以减少延迟
      const distance = Math.sqrt(
        Math.pow(mousePos.current.x - cursorPos.current.x, 2) + 
        Math.pow(mousePos.current.y - cursorPos.current.y, 2)
      );
      
      if (distance > 200 && cursorRef.current) {
        cursorRef.current.style.left = `${mousePos.current.x}px`;
        cursorRef.current.style.top = `${mousePos.current.y}px`;
        cursorPos.current = { ...mousePos.current };
      }
    };

    const handleMouseOver = (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.dataset.cursor === 'hover'
      ) {
        isHovering.current = true;
        cursor.classList.add('hover');
      }
    };

    const handleMouseOut = () => {
      isHovering.current = false;
      cursor.classList.remove('hover');
    };

    // 鼠标移出窗口时隐藏光标
    const handleMouseOutWindow = () => {
      isVisible.current = false;
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '0';
      }
    };

    // 鼠标移入窗口时显示光标
    const handleMouseInWindow = () => {
      isVisible.current = true;
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '1';
      }
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });
    document.addEventListener('mouseleave', handleMouseOutWindow, { passive: true });
    document.addEventListener('mouseenter', handleMouseInWindow, { passive: true });

    rafId.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mouseleave', handleMouseOutWindow);
      document.removeEventListener('mouseenter', handleMouseInWindow);
      cancelAnimationFrame(rafId.current);
      cursor.remove();
    };
  }, []);
};

export default useCustomCursor;