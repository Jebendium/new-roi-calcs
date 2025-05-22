// RSS feed configuration
import { FeedSource } from './types';

// Define feed categories and their associated RSS feeds
export const feedCategories = {
  'UK HR': [
    {
      url: 'https://www.personneltoday.com/feed', // Tool fetched successfully. Verify if app can parse.
      name: 'Personnel Today'
    },
    // {
    //   url: 'https://hr180.co.uk/blog/feed', // 404 ERROR: Verify URL or remove.
    //   name: 'HR180 Blog'
    // },
    // {
    //   url: 'https://www.hrmagazine.co.uk/rss', // 404 ERROR: Verify URL or remove.
    //   name: 'HR Magazine'
    // },
    // {
    //   url: 'https://www.peoplemanagement.co.uk/rss/news', // 404 ERROR: Verify URL or remove.
    //   name: 'People Management'
    // },
    {
      url: 'https://www.hrdept.co.uk/feed', // Tool fetched successfully. Verify if app can parse.
      name: 'The HR Dept'
    },
    // {
    //   url: 'https://www.cipd.co.uk/news-views/all-articles/rss.xml', // 404 ERROR: Verify URL or remove.
    //   name: 'CIPD Articles'
    // }
  ],
  'Global HR': [
    // {
    //   url: 'https://www.hrexchangenetwork.com/rss.xml', // 404 ERROR: Verify URL or remove.
    //   name: 'HR Exchange Network'
    // }
  ],
  'HR Legal': [
    {
      url: 'https://www.xperthr.co.uk/rss-feeds/', // CONFIRMED 500 ERROR: This is likely a page listing feeds. Find the DIRECT feed URL from this page.
      name: 'XpertHR'
    },
    {
      url: 'https://www.gov.uk/government/topics/employment.atom', // CONFIRMED 404 ERROR: Verify URL or remove.
      name: 'GOV.UK Employment Updates'
    }
  ],
  'Payroll': [
    {
      url: 'https://www.cipp.org.uk/resource/news.rss.xml', // CONFIRMED 404 ERROR: Verify URL or remove.
      name: 'CIPP News'
    },
    {
      url: 'https://journeypayroll.com/payroll/feed', // CONTENT MISMATCH: Tool fetched a comments feed, not articles. Find correct article feed URL.
      name: 'Journey Payroll & HR'
    },
    {
      url: 'https://www.gov.uk/government/publications.atom?publication_filter_option=employer-bulletin', // CONFIRMED 404 ERROR: Verify URL or remove.
      name: 'HMRC Employer Bulletin'
    },
    {
      url: 'https://www.payescape.com/blog/rss.xml', // CONFIRMED 404 ERROR: Verify URL or remove.
      name: 'PayeSpace Blog'
    }
  ],
  'Employee Benefits': [
    {
      url: 'https://www.employeebenefits.co.uk/feed', // CONFIRMED 404 ERROR: Verify URL or remove.
      name: 'Employee Benefits UK'
    },
    {
      url: 'https://reba.global/rss', // CONFIRMED 404 ERROR: Verify URL or remove.
      name: 'Reward & Employee Benefits Association (REBA)'
    }
  ]
  // Add other categories like 'Recruitment', 'Wellbeing', 'Future of Work', 'HR Technology'
  // here if you find and verify feeds for them.
};

// Flatten the feeds for processing
export const allFeeds: FeedSource[] = Object.entries(feedCategories).flatMap(([category, feeds]) => 
  feeds.map(feed => ({ ...feed, category }))
);