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
      {/* 1. Hero — scroll-down indicator intégré dans HeroSection */}
      <HeroSection onNavigate={onNavigate} />

      {/* 2. Bond Story */}
      <div className="reveal-up">
        <BondStorySection onNavigate={onNavigate} />
      </div>

      {/* 3. Need Categories */}
      <div className="reveal-up reveal-delay-1">
        <NeedCategories onNavigate={onNavigate} />
      </div>

      {/* 4. Value Props */}
      <div className="reveal-fade">
        <ValueProps onNavigate={onNavigate} />
      </div>

      {/* 5. Best-Sellers */}
      <div className="reveal-up">
        <EssentialsGrid onNavigate={onNavigate} />
      </div>

      {/* 6. Subscriptions */}
      <div className="reveal-scale">
        <RecurringSubscriptionTeaser onNavigate={onNavigate} />
      </div>

      {/* 7. Reviews */}
      <div className="reveal-up">
        <CommunityReviews onNavigate={onNavigate} />
      </div>

      {/* 8. Routine Finder */}
      <div className="reveal-left">
        <RoutineFinderBanner onNavigate={onNavigate} />
      </div>

      {/* 9. Journal */}
      <div className="reveal-up">
        <JournalTeaser onNavigate={onNavigate} />
      </div>

      {/* 10. Newsletter */}
      <div className="reveal-fade">
        <NewsletterSection />
      </div>
    </div>
  );
};
