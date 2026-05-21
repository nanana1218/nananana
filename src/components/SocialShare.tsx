import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Copy, Check, MessageCircle, MessageSquare, Send, Twitter } from 'lucide-react';

interface SocialShareProps {
  title?: string;
  description?: string;
  url?: string;
}

const socialPlatforms = [
  {
    id: 'wechat',
    name: '微信',
    icon: MessageCircle,
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-500/10',
    textColor: 'text-green-400',
  },
  {
    id: 'weibo',
    name: '微博',
    icon: MessageSquare,
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-500/10',
    textColor: 'text-red-400',
  },
  {
    id: 'qq',
    name: 'QQ',
    icon: Send,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-500/10',
    textColor: 'text-blue-400',
  },
  {
    id: 'twitter',
    name: 'Twitter',
    icon: Twitter,
    color: 'from-sky-400 to-sky-500',
    bgColor: 'bg-sky-500/10',
    textColor: 'text-sky-400',
  },
];

export default function SocialShare({
  title = 'Pandas数据分析实战训练营',
  description = '10个行业级实战项目，从数据清洗到机器学习，零门槛掌握数据分析全栈技能',
  url = window.location.href,
}: SocialShareProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = (platform: string) => {
    let shareUrl = '';
    const encodedTitle = encodeURIComponent(title);
    const encodedDesc = encodeURIComponent(description);
    const encodedUrl = encodeURIComponent(url);

    switch (platform) {
      case 'wechat':
        shareUrl = `https://share.weixin.qq.com/cgi-bin/shareqq?url=${encodedUrl}&title=${encodedTitle}&desc=${encodedDesc}`;
        break;
      case 'weibo':
        shareUrl = `https://service.weibo.com/share/share.php?url=${encodedUrl}&title=${encodedTitle}&desc=${encodedDesc}`;
        break;
      case 'qq':
        shareUrl = `https://connect.qq.com/widget/shareqq/index.html?url=${encodedUrl}&title=${encodedTitle}&desc=${encodedDesc}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
        break;
      default:
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
    setIsOpen(false);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      setIsOpen(false);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg text-white text-sm font-medium transition-all"
      >
        <Share2 className="w-4 h-4" />
        <span>分享</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden"
            >
              <div className="p-3 border-b border-gray-100">
                <p className="text-xs text-gray-500 text-center">分享到</p>
              </div>
              <div className="p-2 space-y-1">
                {socialPlatforms.map((platform) => (
                  <motion.button
                    key={platform.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: socialPlatforms.indexOf(platform) * 0.05 }}
                    onClick={() => handleShare(platform.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:${platform.bgColor} transition-colors`}
                  >
                    <platform.icon className={`w-5 h-5 ${platform.textColor}`} />
                    <span className="text-sm text-gray-700">{platform.name}</span>
                  </motion.button>
                ))}
                <div className="border-t border-gray-100 my-2" />
                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  onClick={handleCopyLink}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <Copy className="w-5 h-5 text-gray-500" />
                  )}
                  <span className="text-sm text-gray-700">
                    {copied ? '已复制' : '复制链接'}
                  </span>
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
