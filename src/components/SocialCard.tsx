import React from "react";
import { FiCheckSquare, FiClock, FiUser, FiArrowRight } from "react-icons/fi";

interface SocialCardProps {
  onLaunchApp?: () => void;
}

const SocialCard: React.FC<SocialCardProps> = ({ onLaunchApp }) => {
  return (
    <div className="w-[1200px] h-[630px] bg-[#ffffff] font-mono relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-20 grid-rows-15 h-full w-full">
          {Array.from({ length: 300 }).map((_, i) => (
            <div key={i} className="border border-[#d1d9e0]" />
          ))}
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 p-16 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-bold text-[#0969da] tracking-tight">
              board.sudipbiswas.dev
            </h1>
            <p className="text-lg text-[#656d76] mt-1">
              // Managing tasks should be easy and intuitive
            </p>
          </div>
          <div className="text-right">
            <p className="text-lg text-[#656d76]">by</p>
            <p className="text-xl font-semibold text-[#24292f]">Sudip Biswas</p>
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

        {/* Mini Kanban Preview */}
        <div className="flex-1 flex gap-8">
          {/* Backlog Column */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#d1d9e0]">
              <span className="text-[#656d76] text-sm">//</span>
              <h3 className="text-sm font-medium text-[#656d76] uppercase tracking-wider">
                BACKLOG
              </h3>
              <span className="bg-[#f6f8fa] px-2 py-1 text-xs text-[#656d76] border border-[#d1d9e0] ml-auto">
                2
              </span>
            </div>
            <div className="space-y-3">
              <div className="border border-[#d1d9e0] bg-[#f6f8fa] p-3">
                <p className="text-sm text-[#24292f]">
                  Design user onboarding flow
                </p>
              </div>
              <div className="border border-[#d1d9e0] bg-[#f6f8fa] p-3">
                <p className="text-sm text-[#24292f]">
                  Learn React fundamentals
                </p>
              </div>
            </div>
          </div>

          {/* TODO Column */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#d1d9e0]">
              <span className="text-[#656d76] text-sm">//</span>
              <h3 className="text-sm font-medium text-[#bf8700] uppercase tracking-wider">
                TODO
              </h3>
              <span className="bg-[#f6f8fa] px-2 py-1 text-xs text-[#656d76] border border-[#d1d9e0] ml-auto">
                1
              </span>
            </div>
            <div className="space-y-3">
              <div className="border border-[#d1d9e0] bg-[#f6f8fa] p-3">
                <p className="text-sm text-[#24292f]">
                  Plan Q4 product roadmap
                </p>
              </div>
            </div>
          </div>

          {/* IN PROGRESS Column */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#d1d9e0]">
              <span className="text-[#656d76] text-sm">//</span>
              <h3 className="text-sm font-medium text-[#0969da] uppercase tracking-wider">
                IN_PROGRESS
              </h3>
              <span className="bg-[#f6f8fa] px-2 py-1 text-xs text-[#656d76] border border-[#d1d9e0] ml-auto">
                1
              </span>
            </div>
            <div className="space-y-3">
              <div className="border border-[#0969da] bg-[#ffffff] p-3">
                <p className="text-sm text-[#24292f]">
                  Build user authentication system
                </p>
              </div>
            </div>
          </div>

          {/* DONE Column */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#d1d9e0]">
              <span className="text-[#656d76] text-sm">//</span>
              <h3 className="text-sm font-medium text-[#1a7f37] uppercase tracking-wider">
                DONE
              </h3>
              <span className="bg-[#f6f8fa] px-2 py-1 text-xs text-[#656d76] border border-[#d1d9e0] ml-auto">
                1
              </span>
            </div>
            <div className="space-y-3">
              <div className="border border-[#d1d9e0] bg-[#f6f8fa] p-3">
                <p className="text-sm text-[#24292f]">
                  Launch mobile app beta version
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-12 pt-8 border-t border-[#d1d9e0]">
          <div className="flex items-center justify-center gap-12 mb-8">
            <div className="flex items-center gap-3 text-[#656d76]">
              <FiCheckSquare className="text-xl" />
              <span className="text-sm">Drag & Drop Tasks</span>
            </div>
            <div className="flex items-center gap-3 text-[#656d76]">
              <FiClock className="text-xl" />
              <span className="text-sm">Real-time Updates</span>
            </div>
            <div className="flex items-center gap-3 text-[#656d76]">
              <FiUser className="text-xl" />
              <span className="text-sm">Clean Interface</span>
            </div>
          </div>

          {/* Launch App Button */}
          <div className="flex justify-center">
            <button
              onClick={onLaunchApp}
              className="flex items-center gap-3 bg-[#0969da] hover:bg-[#0860ca] text-white px-6 py-3 text-sm font-medium border border-[#0969da] hover:border-[#0860ca]"
            >
              <span>Launch App</span>
              <FiArrowRight className="text-base" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialCard;
