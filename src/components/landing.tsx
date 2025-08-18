import React from "react";
import { FiCheckSquare, FiClock, FiUser, FiArrowRight } from "react-icons/fi";

interface LandingPageProps {
  onLaunchApp?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLaunchApp }) => {
  return (
    <div className="w-full md:max-w-6xl md:mx-auto bg-[#ffffff] font-mono relative overflow-hidden h-full">
      <div className="relative z-10 p-4 sm:p-8 md:p-10 h-full flex flex-col">
        <div className="mb-8 sm:mb-12">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
            <div className="text-left">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#0969da] tracking-tight">
                board.sudipbiswas.dev
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-[#656d76] mt-1">
                // Managing tasks should be easy and intuitive
              </p>
            </div>
            <div className="hidden lg:block text-right">
              <p className="text-sm sm:text-base lg:text-lg text-[#656d76]">
                by
              </p>
              <p className="text-lg sm:text-xl font-semibold text-[#24292f]">
                Sudip Biswas
              </p>
              <a
                href="https://x.com/sudipcodes"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#0969da]"
              >
                @sudipcodes
              </a>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col lg:flex-row gap-4 lg:gap-8">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#d1d9e0]">
              <span className="text-[#656d76] text-sm">//</span>
              <h3 className="text-xs sm:text-sm font-medium text-[#656d76] uppercase tracking-wider">
                BACKLOG
              </h3>
              <span className="bg-[#f6f8fa] px-2 py-1 text-xs text-[#656d76] border border-[#d1d9e0] ml-auto">
                2
              </span>
            </div>
            <div className="space-y-2 lg:space-y-3">
              <div className="border border-[#d1d9e0] bg-[#f6f8fa] p-2 sm:p-3">
                <p className="text-xs sm:text-sm text-[#24292f]">
                  Design user onboarding flow
                </p>
              </div>
              <div className="border border-[#d1d9e0] bg-[#f6f8fa] p-2 sm:p-3">
                <p className="text-xs sm:text-sm text-[#24292f]">
                  Learn React fundamentals
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#d1d9e0]">
              <span className="text-[#656d76] text-sm">//</span>
              <h3 className="text-xs sm:text-sm font-medium text-[#bf8700] uppercase tracking-wider">
                TODO
              </h3>
              <span className="bg-[#f6f8fa] px-2 py-1 text-xs text-[#656d76] border border-[#d1d9e0] ml-auto">
                1
              </span>
            </div>
            <div className="space-y-2 lg:space-y-3">
              <div className="border border-[#d1d9e0] bg-[#f6f8fa] p-2 sm:p-3">
                <p className="text-xs sm:text-sm text-[#24292f]">
                  Plan Q4 product roadmap
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#d1d9e0]">
              <span className="text-[#656d76] text-sm">//</span>
              <h3 className="text-xs sm:text-sm font-medium text-[#0969da] uppercase tracking-wider">
                IN_PROGRESS
              </h3>
              <span className="bg-[#f6f8fa] px-2 py-1 text-xs text-[#656d76] border border-[#d1d9e0] ml-auto">
                1
              </span>
            </div>
            <div className="space-y-2 lg:space-y-3">
              <div className="border border-[#0969da] bg-[#ffffff] p-2 sm:p-3">
                <p className="text-xs sm:text-sm text-[#24292f]">
                  Build user authentication system
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#d1d9e0]">
              <span className="text-[#656d76] text-sm">//</span>
              <h3 className="text-xs sm:text-sm font-medium text-[#1a7f37] uppercase tracking-wider">
                DONE
              </h3>
              <span className="bg-[#f6f8fa] px-2 py-1 text-xs text-[#656d76] border border-[#d1d9e0] ml-auto">
                1
              </span>
            </div>
            <div className="space-y-2 lg:space-y-3">
              <div className="border border-[#d1d9e0] bg-[#f6f8fa] p-2 sm:p-3">
                <p className="text-xs sm:text-sm text-[#24292f]">
                  Launch mobile app beta version
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 md:mt-16 pt-6 lg:pt-8 border-t border-[#d1d9e0]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start sm:justify-center gap-6 sm:gap-8 lg:gap-12 mb-6 lg:mb-8">
            <div className="flex items-center gap-2 sm:gap-3 text-[#656d76]">
              <FiCheckSquare className="text-lg sm:text-xl" />
              <span className="text-xs sm:text-sm">Drag & Drop Tasks</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 text-[#656d76]">
              <FiClock className="text-lg sm:text-xl" />
              <span className="text-xs sm:text-sm">Real-time Updates</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 text-[#656d76]">
              <FiUser className="text-lg sm:text-xl" />
              <span className="text-xs sm:text-sm">Clean Interface</span>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={onLaunchApp}
              className="w-full lg:w-auto flex items-center justify-center gap-2 sm:gap-3 bg-[#0969da] hover:bg-[#0860ca] text-white px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium border border-[#0969da] hover:border-[#0860ca] transition-colors"
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
