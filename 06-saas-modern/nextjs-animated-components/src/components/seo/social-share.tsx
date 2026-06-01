"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCallback, useState, useEffect } from "react";

// =============================================================================
// Social Share Buttons - Link Building & Virality
// =============================================================================
// Social shares = backlinks = better rankings
// Each share creates potential inbound links to your content

export interface ShareData {
  url: string;
  title: string;
  description?: string;
  hashtags?: string[];
  via?: string; // Twitter username
  image?: string;
}

export interface SocialShareProps {
  data: ShareData;
  platforms?: Platform[];
  className?: string;
  variant?: "default" | "minimal" | "pill" | "icon-only" | "floating";
  size?: "sm" | "md" | "lg";
  showCopy?: boolean;
  showCount?: boolean;
  onShare?: (platform: Platform) => void;
}

type Platform =
  | "twitter"
  | "facebook"
  | "linkedin"
  | "reddit"
  | "hackernews"
  | "pinterest"
  | "whatsapp"
  | "telegram"
  | "email";

const platformConfig: Record<
  Platform,
  {
    name: string;
    color: string;
    hoverColor: string;
    icon: React.ReactNode;
    getUrl: (data: ShareData) => string;
  }
> = {
  twitter: {
    name: "Twitter",
    color: "bg-black dark:bg-white",
    hoverColor: "hover:bg-neutral-800 dark:hover:bg-neutral-200",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    getUrl: (data) => {
      const params = new URLSearchParams({
        text: data.title,
        url: data.url,
        ...(data.hashtags && { hashtags: data.hashtags.join(",") }),
        ...(data.via && { via: data.via }),
      });
      return `https://twitter.com/intent/tweet?${params}`;
    },
  },
  facebook: {
    name: "Facebook",
    color: "bg-[#1877F2]",
    hoverColor: "hover:bg-[#166FE5]",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    getUrl: (data) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(data.url)}`,
  },
  linkedin: {
    name: "LinkedIn",
    color: "bg-[#0A66C2]",
    hoverColor: "hover:bg-[#004182]",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    getUrl: (data) => {
      const params = new URLSearchParams({
        url: data.url,
        title: data.title,
        ...(data.description && { summary: data.description }),
      });
      return `https://www.linkedin.com/shareArticle?mini=true&${params}`;
    },
  },
  reddit: {
    name: "Reddit",
    color: "bg-[#FF4500]",
    hoverColor: "hover:bg-[#E03D00]",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
      </svg>
    ),
    getUrl: (data) =>
      `https://reddit.com/submit?url=${encodeURIComponent(data.url)}&title=${encodeURIComponent(data.title)}`,
  },
  hackernews: {
    name: "Hacker News",
    color: "bg-[#FF6600]",
    hoverColor: "hover:bg-[#E55C00]",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M0 24V0h24v24H0zM6.951 5.896l4.112 7.708v5.064h1.583v-4.972l4.148-7.799h-1.749l-2.457 4.875c-.372.745-.688 1.434-.688 1.434s-.297-.708-.651-1.434L8.831 5.896h-1.88z" />
      </svg>
    ),
    getUrl: (data) =>
      `https://news.ycombinator.com/submitlink?u=${encodeURIComponent(data.url)}&t=${encodeURIComponent(data.title)}`,
  },
  pinterest: {
    name: "Pinterest",
    color: "bg-[#E60023]",
    hoverColor: "hover:bg-[#C8001E]",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
      </svg>
    ),
    getUrl: (data) => {
      const params = new URLSearchParams({
        url: data.url,
        description: data.title,
        ...(data.image && { media: data.image }),
      });
      return `https://pinterest.com/pin/create/button/?${params}`;
    },
  },
  whatsapp: {
    name: "WhatsApp",
    color: "bg-[#25D366]",
    hoverColor: "hover:bg-[#20BD5A]",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
    ),
    getUrl: (data) =>
      `https://wa.me/?text=${encodeURIComponent(`${data.title} ${data.url}`)}`,
  },
  telegram: {
    name: "Telegram",
    color: "bg-[#0088cc]",
    hoverColor: "hover:bg-[#007AB8]",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
    getUrl: (data) =>
      `https://t.me/share/url?url=${encodeURIComponent(data.url)}&text=${encodeURIComponent(data.title)}`,
  },
  email: {
    name: "Email",
    color: "bg-neutral-700 dark:bg-neutral-600",
    hoverColor: "hover:bg-neutral-600 dark:hover:bg-neutral-500",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    getUrl: (data) =>
      `mailto:?subject=${encodeURIComponent(data.title)}&body=${encodeURIComponent(`${data.description || ""}\n\n${data.url}`)}`,
  },
};

const defaultPlatforms: Platform[] = [
  "twitter",
  "facebook",
  "linkedin",
  "reddit",
];

export function SocialShare({
  data,
  platforms = defaultPlatforms,
  className,
  variant = "default",
  size = "md",
  showCopy = true,
  onShare,
}: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(data.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [data.url]);

  const handleShare = (platform: Platform) => {
    const config = platformConfig[platform];
    window.open(config.getUrl(data), "_blank", "width=600,height=400");
    onShare?.(platform);
  };

  const sizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const iconSizes = {
    sm: "[&_svg]:w-4 [&_svg]:h-4",
    md: "[&_svg]:w-5 [&_svg]:h-5",
    lg: "[&_svg]:w-6 [&_svg]:h-6",
  };

  const variants = {
    default: {
      container: "flex items-center gap-2",
      button: (color: string, hover: string) =>
        cn(
          "flex items-center justify-center rounded-full text-white transition-colors",
          sizes[size],
          iconSizes[size],
          color,
          hover
        ),
    },
    minimal: {
      container: "flex items-center gap-3",
      button: () =>
        cn(
          "flex items-center justify-center text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors",
          iconSizes[size]
        ),
    },
    pill: {
      container: "flex items-center gap-2",
      button: (color: string, hover: string) =>
        cn(
          "flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-medium transition-colors",
          color,
          hover
        ),
    },
    "icon-only": {
      container: "flex items-center gap-1",
      button: () =>
        cn(
          "flex items-center justify-center p-2 rounded-lg text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors",
          iconSizes[size]
        ),
    },
    floating: {
      container:
        "fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-50",
      button: (color: string, hover: string) =>
        cn(
          "flex items-center justify-center rounded-full text-white shadow-lg transition-all hover:scale-110",
          sizes[size],
          iconSizes[size],
          color,
          hover
        ),
    },
  };

  const style = variants[variant];

  return (
    <div className={cn(style.container, className)}>
      {platforms.map((platform, index) => {
        const config = platformConfig[platform];
        return (
          <motion.button
            key={platform}
            onClick={() => handleShare(platform)}
            className={style.button(config.color, config.hoverColor)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={`Share on ${config.name}`}
          >
            {config.icon}
            {variant === "pill" && <span>{config.name}</span>}
          </motion.button>
        );
      })}

      {showCopy && (
        <motion.button
          onClick={handleCopy}
          className={cn(
            style.button("bg-neutral-200 dark:bg-neutral-700", "hover:bg-neutral-300 dark:hover:bg-neutral-600"),
            "text-neutral-700 dark:text-neutral-300"
          )}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: platforms.length * 0.05 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title="Copy link"
        >
          {copied ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
              />
            </svg>
          )}
          {variant === "pill" && <span>{copied ? "Copied!" : "Copy"}</span>}
        </motion.button>
      )}
    </div>
  );
}

// =============================================================================
// Native Share API (Mobile-first)
// =============================================================================

export interface NativeShareProps {
  data: ShareData;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onShare?: () => void;
  onError?: (error: Error) => void;
}

export function NativeShare({
  data,
  children,
  fallback,
  onShare,
  onError,
}: NativeShareProps) {
  const [canShare, setCanShare] = useState(false);

  // Check if native share is available
  useEffect(() => {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      setCanShare(true);
    }
  }, []);

  const handleShare = async () => {
    try {
      await navigator.share({
        title: data.title,
        text: data.description,
        url: data.url,
      });
      onShare?.();
    } catch (err) {
      if (err instanceof Error && err.name !== "AbortError") {
        onError?.(err);
      }
    }
  };

  if (!canShare) {
    return fallback || null;
  }

  return <div onClick={handleShare}>{children}</div>;
}

// =============================================================================
// Share Button with Count (for engagement metrics)
// =============================================================================

export interface ShareCountButtonProps {
  platform: Platform;
  url: string;
  title: string;
  count?: number;
  className?: string;
}

export function ShareCountButton({
  platform,
  url,
  title,
  count,
  className,
}: ShareCountButtonProps) {
  const config = platformConfig[platform];

  const handleClick = () => {
    window.open(
      config.getUrl({ url, title }),
      "_blank",
      "width=600,height=400"
    );
  };

  return (
    <motion.button
      onClick={handleClick}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors",
        className
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="text-neutral-600 dark:text-neutral-400">
        {config.icon}
      </span>
      <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
        {config.name}
      </span>
      {count !== undefined && (
        <span className="text-xs text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded-full">
          {count.toLocaleString()}
        </span>
      )}
    </motion.button>
  );
}
