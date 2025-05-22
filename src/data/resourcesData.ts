interface ResourceInfo {
  type: string;
  title: string;
  description: string;
  iconSvg: string;
  gradient: string;
}

export const resourcesData: ResourceInfo[] = [
  { 
    type: 'industry-news', 
    title: 'Industry News',
    description: 'Stay updated with the latest developments in employee benefits, compliance changes, and industry trends. Our regularly updated news section keeps you informed about what matters most to HR professionals.',
    iconSvg: '<path d="M19 20H5C3.89543 20 3 19.1046 3 18V6C3 4.89543 3.89543 4 5 4H19C20.1046 4 21 4.89543 21 6V18C21 19.1046 20.1046 20 19 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 8H8V14H16V8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 16H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>',
    gradient: 'from-blue-600 to-blue-500'
  },
  { 
    type: 'blog', 
    title: 'Blog',
    description: 'Dive into our expert insights and thought leadership on optimising employee benefits. Our blog explores strategies for maximising value, improving employee satisfaction, and implementing best practices in UK benefits management.',
    iconSvg: '<path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 15C5.5 15 5.5 21 5.5 21H18.5C18.5 21 18.5 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>',
    gradient: 'from-purple-600 to-purple-500'
  },
  { 
    type: 'guides-whitepapers', 
    title: 'Guides & Whitepapers',
    description: 'Access our comprehensive collection of expert guides, whitepapers, and research reports on employee benefits. These in-depth resources provide actionable insights for implementing and optimising benefits schemes in UK businesses of all sizes.',
    iconSvg: '<path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 7H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 12H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 17H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>',
    gradient: 'from-green-600 to-green-500'
  }
];