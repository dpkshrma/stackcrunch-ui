import soIcon from '../../../icons/community/so-icon.svg';
import sfIcon from '../../../icons/community/sf-icon.svg';
import suIcon from '../../../icons/community/su-icon.png';
import secIcon from '../../../icons/community/sec-icon.png';
import seIcon from '../../../icons/community/se-icon.png';

export const clickables = [
  {
    id: 'serverfault',
    community: {
      name: 'ServerFault',
      description: '',
      link: 'https://serverfault.com/',
      icon: sfIcon
    },
    top: 520,
    left: 150,
    maxBounce: 12,
    icon: {
      color: '#C0F'
    },
    questions: [
      {
        text: 'How do I deal with a compromised server?',
        link:
          'https://serverfault.com/questions/218005/how-do-i-deal-with-a-compromised-server',
        description:
          'This is quite common problems faced by IT guys. Answers deeply evaluate various possible solutions for recovery, repair & safeguarding valuable user information'
      },
      {
        text:
          'What is a Pem file and how does it differ from other OpenSSL Generated Key File Formats?',
        link:
          'https://serverfault.com/questions/9708/what-is-a-pem-file-and-how-does-it-differ-from-other-openssl-generated-key-file',
        description:
          "SSL has been around for long enough you'd think that there would be agreed upon container formats. And you're right, there are. Too many standards as it happens"
      },
      {
        text: 'Can scp copy directories?',
        link:
          'https://serverfault.com/questions/264595/can-scp-copy-directories',
        description:
          'Although there are several ways to copy data back & forth b/w server & local environment, knowing how to securely do that is quite essential for an IT person.'
      },
      {
        text: 'What exactly do the colors in htop status bars mean?',
        link:
          'https://serverfault.com/questions/180711/what-exactly-do-the-colors-in-htop-status-bars-mean',
        description:
          'There are a huge number of tools available to monitor system & network usage. HTOP definitely ranks on top. This question elaborates upon its usage.'
      }
    ]
  },
  {
    id: 'stackoverflow',
    community: {
      name: 'StackOverflow',
      description:
        'With over 10 million questions answered, StackOverflow stands to be one of the largest Q&A community. Read, write & learn from short articles based on this highly moderated content on StackCrunch.',
      link: 'https://stackoverflow.com/',
      icon: soIcon
    },
    top: 520,
    left: 0,
    maxBounce: 8,
    icon: {
      color: '#FD5F00'
    },
    questions: [
      {
        text:
          'In CSS Flexbox, why are there no “justify-items” and “justify-self” properties?',
        link:
          'https://stackoverflow.com/questions/32551291/in-css-flexbox-why-are-there-no-justify-items-and-justify-self-properties',
        description:
          'The question raises important concerns over lacking W3C Flexbox specification and answers cover how to implement important features w/o these properties.'
      },
      {
        text: 'How do JavaScript closures work?',
        link:
          'https://stackoverflow.com/questions/111102/how-do-javascript-closures-work',
        description:
          'Highest rated question under Javascript tag about one of the most widely used javascript concept. Over 70+ answers explain this concept in depth with examples and references.'
      },
      {
        text: 'Validate decimal numbers in JavaScript - IsNumeric()',
        link:
          'https://stackoverflow.com/questions/18082/validate-decimal-numbers-in-javascript-isnumeric',
        description:
          'In Javascript, when global identifiers like NaN are also of datatype number, such validations become quite difficult which clearly explains 1.4m views on this question.'
      },
      {
        text: 'Programmatically navigate using react router',
        link:
          'https://stackoverflow.com/questions/31079081/programmatically-navigate-using-react-router',
        description:
          'Using very active libraries like react-router come with their own set of doubts with each released version. Programmers need to be consistently aware of the latest usage.'
      },
      {
        text: 'How to undo the most recent commits in Git?',
        link:
          'https://stackoverflow.com/questions/927358/how-to-undo-the-most-recent-commits-in-git',
        description:
          '6m views signify how important knowing basic features of Git are important. Being aware and Regularly updating oneself with such pieces of information can prove vital to delivering projects on time.'
      }
    ]
  },
  {
    id: 'superuser',
    community: {
      name: 'SuperUser',
      // description: 'High Productivity becomes necessary when it comes to delivering high quality products quickly. ',
      link: 'https://superuser.com/',
      icon: suIcon
    },
    top: 520,
    left: -300,
    maxBounce: 14,
    icon: {
      color: '#0ff'
    },
    questions: [
      {
        text: 'What is the cURL command-line syntax to do a POST request?',
        link:
          'https://superuser.com/questions/149329/what-is-the-curl-command-line-syntax-to-do-a-post-request',
        description:
          'One would be surprised after checking the answers how many different options does cURL support in order to make a very specific type of POST request'
      },
      {
        text: 'How do I scroll in tmux?',
        link: 'https://superuser.com/questions/209437/how-do-i-scroll-in-tmux',
        description:
          'TMUX is epitome of productivity when it comes to virtual terminals. This questions covers an aspect of understanding keyboard shortcuts and being able to navigate terminals easily'
      },
      {
        text: 'How do you reload your .vimrc file without restarting vim?',
        link:
          'https://superuser.com/questions/132029/how-do-you-reload-your-vimrc-file-without-restarting-vim',
        description:
          'VIM was voted as the most widely adopted editor in Hackerrank developer survey. Understanding how to modify your development environment quickly can be a solid productivity booster'
      }
    ]
  },
  {
    id: 'security',
    community: {
      name: 'Information Security',
      // description: 'This community contains vast amount of solutions from highly experienced security professionals'
      link: 'https://security.stackexchange.com/',
      icon: secIcon
    },
    top: 520,
    left: -150,
    maxBounce: 8,
    icon: {
      color: '#39FF14'
    },
    questions: [
      {
        text: 'Token-based authentication - Securing the token',
        link:
          'https://security.stackexchange.com/questions/19676/token-based-authentication-securing-the-token',
        description:
          'Ranked as #1 on the OWASP Top 10 Application Security Risks, knowing how to create a secure mechanism for user authentication is crucial for creating a reliable application'
      },
      {
        text:
          'Does blocking an IP with IP Tables protect you from a DOS (not DDOS) attack?',
        link:
          'https://security.stackexchange.com/questions/178726/does-blocking-an-ip-with-ip-tables-protect-you-from-a-dos-not-ddos-attack',
        description:
          'This question raises an important concern on how to block incoming requests from spammers while differentiating from often confused term DDOS which involves requests from multiple sources'
      },
      {
        text: 'To firewall or not to firewall?',
        link:
          'https://security.stackexchange.com/questions/1977/to-firewall-or-not-to-firewall',
        description:
          'This question discusses about pros on cons of using a firewall, different variations of the same, Next Gen Firewalls (NGWFs) and protecting Personally Identifiable Information (PII)'
      }
    ]
  },
  {
    id: 'softwareEngineering',
    community: {
      name: 'Software Engineering',
      link: 'https://softwareengineering.stackexchange.com/',
      icon: seIcon
    },
    top: 520,
    left: 300,
    maxBounce: 4,
    icon: {
      color: '#00f'
    },
    questions: [
      {
        text: "I've inherited 200K lines of spaghetti code — what now?",
        link:
          'https://softwareengineering.stackexchange.com/questions/155488/ive-inherited-200k-lines-of-spaghetti-code-what-now',
        description:
          'By Pareto Principle, you need 20% of the knowledge to get 80% of the job done. Practicality becomes the forefront of solving tough problems like these.'
      },
      {
        text:
          'What technical details should a programmer of a web application consider before making the site public?',
        link:
          'https://softwareengineering.stackexchange.com/questions/46716/what-technical-details-should-a-programmer-of-a-web-application-consider-before',
        description:
          'Important design decisions to be taken before going live discussed in great depth. It talks about important considerations like user/developer experience, security & performance'
      },
      {
        text:
          "My boss decided to add a “person to blame” field to every bug report. How can I convince him that it's a bad idea?",
        link:
          'https://softwareengineering.stackexchange.com/questions/154733/my-boss-decided-to-add-a-person-to-blame-field-to-every-bug-report-how-can-i',
        description:
          "Writing good quality & maintainable code isn't always the single job of a developer, being on right side of things is also an important decision to make. This involves making some tough calls while designing/configuring a software"
      }
    ]
  }
];
