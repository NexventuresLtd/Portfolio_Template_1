import type { FooterLink, ContactInfo as ContactInfoType, SocialLink } from '../types';

// Footer-related constants
export const createFooterLinks = (t: (key: string) => string) => {
    const companyLinks: FooterLink[] = [
        { name: t('footer.links.about'), href: '#about' },
        { name: t('footer.links.team'), href: '#team' },
        { name: t('footer.links.values'), href: '#values' },
        { name: t('footer.links.mission'), href: '#mission' },
        { name: t('footer.links.service'), href: '/service' }
    ];

    const legalLinks: FooterLink[] = [
        { name: t('footer.legal.privacy'), href: '#privacy' },
        { name: t('footer.legal.terms'), href: '#terms' },
        { name: t('footer.legal.cookies'), href: '#cookies' },
        { name: t('footer.legal.disclaimer'), href: '#disclaimer' }
    ];

    return { companyLinks, legalLinks };
};

// Contact information constants
export const CONTACT_INFO: ContactInfoType = {
    phone: '+250 790 225 000',
    phoneLink: 'tel:+250788123456',
    email: 'info@robertconstruction.rw',
    emailLink: 'mailto:info@robertconstruction.rw',
    address: {
        street: 'KG 123 St, Kimisagara',
        city: 'Nyarugenge, Kigali, Rwanda'
    }
} as const;

// Social media links
export const SOCIAL_LINKS: readonly SocialLink[] = [
    { platform: 'Facebook', href: '#', color: '#1877F2' },
    { platform: 'Instagram', href: '#', color: '#E4405F' },
    { platform: 'LinkedIn', href: '#', color: '#0A66C2' },
    { platform: 'YouTube', href: '#', color: '#FF0000' },
    { platform: 'Twitter', href: '#', color: '#1DA1F2' }
] as const;

// Scroll threshold for back-to-top button
export const BACK_TO_TOP_THRESHOLD = 400;
