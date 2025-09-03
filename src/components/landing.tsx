import React from "react";
import { FiCheckSquare, FiClock, FiUser, FiArrowRight } from "react-icons/fi";

interface LandingPageProps {
  onLaunchApp?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLaunchApp }) => {
  return (
    <div className="w-full md:max-w-6xl md:mx-auto relative overflow-hidden h-full">
      <div className="relative z-10 p-4 sm:p-8 md:p-10 h-full flex flex-col">
        <div className="mb-8 sm:mb-12">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
            <div className="text-left">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary tracking-tight">
                board.sudipbiswas.dev
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mt-1">
                // Managing tasks should be easy and intuitive
              </p>
            </div>
            <div className="hidden lg:block text-right">
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
                by
              </p>
              <p className="text-lg sm:text-xl font-semibold">Sudip Biswas</p>
              <a
                href="https://x.com/sudipcodes"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary"
              >
                @sudipcodes
              </a>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col lg:flex-row gap-4 lg:gap-8">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b">
              <span className="text-muted-foreground text-sm">//</span>
              <h3 className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wider">
                BACKLOG
              </h3>
              <span className="bg-muted px-2 py-1 text-xs text-muted-foreground border ml-auto">
                2
              </span>
            </div>
            <div className="space-y-2 lg:space-y-3">
              <div className="border bg-muted p-2 sm:p-3">
                <p className="text-xs sm:text-sm">
                  Design user onboarding flow
                </p>
              </div>
              <div className="border bg-muted p-2 sm:p-3">
                <p className="text-xs sm:text-sm">Learn React fundamentals</p>
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b">
              <span className="text-muted-foreground text-sm">//</span>
              <h3 className="text-xs sm:text-sm font-medium text-warning uppercase tracking-wider">
                TODO
              </h3>
              <span className="bg-muted px-2 py-1 text-xs text-muted-foreground border ml-auto">
                1
              </span>
            </div>
            <div className="space-y-2 lg:space-y-3">
              <div className="border bg-muted p-2 sm:p-3">
                <p className="text-xs sm:text-sm">Plan Q4 product roadmap</p>
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b">
              <span className="text-muted-foreground text-sm">//</span>
              <h3 className="text-xs sm:text-sm font-medium text-primary uppercase tracking-wider">
                IN_PROGRESS
              </h3>
              <span className="bg-muted px-2 py-1 text-xs text-muted-foreground border ml-auto">
                1
              </span>
            </div>
            <div className="space-y-2 lg:space-y-3">
              <div className="border border-primary p-2 sm:p-3">
                <p className="text-xs sm:text-sm">
                  Build user authentication system
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b">
              <span className="text-muted-foreground text-sm">//</span>
              <h3 className="text-xs sm:text-sm font-medium text-success uppercase tracking-wider">
                DONE
              </h3>
              <span className="bg-muted px-2 py-1 text-xs text-muted-foreground border ml-auto">
                1
              </span>
            </div>
            <div className="space-y-2 lg:space-y-3">
              <div className="border bg-muted p-2 sm:p-3">
                <p className="text-xs sm:text-sm">
                  Launch mobile app beta version
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 md:mt-16 pt-6 lg:pt-8 border-t">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start sm:justify-center gap-6 sm:gap-8 lg:gap-12 mb-6 lg:mb-8">
            <div className="flex items-center gap-2 sm:gap-3 text-muted-foreground">
              <FiCheckSquare className="text-lg sm:text-xl" />
              <span className="text-xs sm:text-sm">Drag & Drop Tasks</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 text-muted-foreground">
              <FiClock className="text-lg sm:text-xl" />
              <span className="text-xs sm:text-sm">Real-time Updates</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 text-muted-foreground">
              <FiUser className="text-lg sm:text-xl" />
              <span className="text-xs sm:text-sm">Clean Interface</span>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={onLaunchApp}
              className="w-full lg:w-auto flex items-center justify-center gap-2 sm:gap-3 bg-primary hover:brightness-95 text-background dark:text-foreground px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium border border-primary"
            >
              <span>Launch App</span>
              <FiArrowRight className="text-sm sm:text-base" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
