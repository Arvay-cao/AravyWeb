import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
export const useScrollTrigger = (config) => {
    const triggerRef = useRef(null);
    useEffect(() => {
        triggerRef.current = ScrollTrigger.create({
            trigger: config.trigger,
            start: config.start || 'top 80%',
            end: config.end || 'bottom 20%',
            scrub: config.scrub || false,
            pin: config.pin || false,
            markers: config.markers || false,
            onEnter: config.onEnter,
            onLeave: config.onLeave,
            onEnterBack: config.onEnterBack,
            onLeaveBack: config.onLeaveBack,
        });
        return () => {
            triggerRef.current?.kill();
        };
    }, [config]);
    return triggerRef;
};
export const useParallax = (selector, yPercent = 20, triggerSelector) => {
    const tweenRef = useRef(null);
    useEffect(() => {
        const elements = document.querySelectorAll(selector);
        if (!elements.length)
            return;
        elements.forEach((el) => {
            tweenRef.current = gsap.to(el, {
                yPercent,
                ease: 'none',
                scrollTrigger: {
                    trigger: triggerSelector || el,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                },
            });
        });
        return () => {
            tweenRef.current?.scrollTrigger?.kill();
            tweenRef.current?.kill();
        };
    }, [selector, yPercent, triggerSelector]);
};
export default useScrollTrigger;
