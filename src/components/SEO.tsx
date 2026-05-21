import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  image?: string;
  url?: string;
}

export default function SEO({
  title = 'Pandas数据分析实战训练营 - 从零开始掌握数据分析技能',
  description = '10个行业级实战项目，从数据清洗到机器学习，零门槛掌握数据分析全栈技能。广东科学技术职业学院学生作品。',
  keywords = '数据分析,Python,Pandas,数据挖掘,机器学习,实战项目,数据清洗,可视化',
  author = '广东科学技术职业学院商学院商务数据分析与应用专业',
  image = 'https://nananana-ss.pages.dev/og-image.png',
  url = typeof window !== 'undefined' ? window.location.href : 'https://nananana-ss.pages.dev/',
}: SEOProps) {
  useEffect(() => {
    // 设置页面标题
    document.title = title;

    // 设置 meta 标签
    const metaTags = [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
      { name: 'author', content: author },
      { name: 'theme-color', content: '#1e40af' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      
      // Open Graph 标签
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
      { property: 'og:image', content: image },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Pandas数据分析实战训练营' },
      
      // Twitter 标签
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
      
      // 结构化数据
      { name: 'application-name', content: 'Pandas数据分析实战训练营' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-title', content: '数据分析训练营' },
    ];

    metaTags.forEach(({ name, property, content }) => {
      let tag = document.querySelector(
        property ? `meta[property="${property}"]` : `meta[name="${name}"]`
      );
      if (!tag) {
        tag = document.createElement('meta');
        if (property) {
          tag.setAttribute('property', property);
        } else {
          tag.setAttribute('name', name);
        }
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });

    // 设置结构化数据
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    const ldJson = {
      '@context': 'https://schema.org',
      '@type': 'EducationalCourse',
      name: title,
      description: description,
      provider: {
        '@type': 'Organization',
        name: '广东科学技术职业学院',
        sameAs: 'https://www.gdstc.edu.cn/',
      },
      educationalLevel: 'Beginner to Intermediate',
      numberOfLessons: 10,
      subject: ['Data Analysis', 'Python Programming', 'Machine Learning', 'Data Visualization'],
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(ldJson);
    document.head.appendChild(script);
  }, [title, description, keywords, author, image, url]);

  return null;
}
