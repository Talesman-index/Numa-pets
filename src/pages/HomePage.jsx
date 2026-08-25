import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { BondStorySection } from '../components/home/BondStorySection';
import { NeedCategories } from '../components/home/NeedCategories';
import { ValueProps } from '../components/home/ValueProps';
import { EssentialsGrid } from '../components/home/EssentialsGrid';
import { RecurringSubscriptionTeaser } from '../components/home/RecurringSubscriptionTeaser';
import { CommunityReviews } from '../components/home/CommunityReviews';
import { RoutineFinderBanner } from '../components/home/RoutineFinderBanner';
import { JournalTeaser } from '../components/home/JournalTeaser';
import { NewsletterSection } from '../components/home/NewsletterSection';

export const HomePage = ({ onNavigate }) => {
  return (
    <div>
      {/* 1. Dark #036146 Hero + Peeking Pets + 3 Overlap Cards */}
      <HeroSection onNavigate={onNavigate} />

      {/* 2. Welcome / Brand Story with Golden Circle Mask */}
      <BondStorySection onNavigate={onNavigate} />

      {/* 3. Providing Our Best: 3 Arched Cards on Rich Cream Background */}
      <NeedCategories onNavigate={onNavigate} />

      {/* 4. Pet Essentials / 4 Numbered Pillars + Lifestyle photo */}
      <ValueProps onNavigate={onNavigate} />

      {/* 5. Featured Best-Sellers Catalog */}
      <EssentialsGrid onNavigate={onNavigate} />

      {/* 6. Pricing & Recurring Subscriptions in #036146 */}
      <RecurringSubscriptionTeaser onNavigate={onNavigate} />

      {/* 7. Client Reviews with Circular Avatar */}
      <CommunityReviews onNavigate={onNavigate} />

      {/* 8. Booking / Routine Finder Banner */}
      <RoutineFinderBanner onNavigate={onNavigate} />

      {/* 9. Journal & Advice Guides */}
      <JournalTeaser onNavigate={onNavigate} />

      {/* 10. Newsletter Section in #036146 */}
      <NewsletterSection />
    </div>
  );
};
