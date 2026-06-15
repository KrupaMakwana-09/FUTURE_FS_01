import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Github } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "./ThemeProvider";

type LanguageCount = {
  name: string;
  count: number;
};

export function GitHubStats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const username = "KrupaMakwana-09";
  const [statsImageError, setStatsImageError] = useState(false);
  const [langsImageError, setLangsImageError] = useState(false);
  const [githubData, setGithubData] = useState<{
    publicRepos?: number;
    followers?: number;
    following?: number;
    totalStars?: number;
    topLanguages?: LanguageCount[];
  } | null>(null);
  const [githubApiError, setGithubApiError] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    let active = true;
    const controller = new AbortController();

    async function fetchGithubData() {
      try {
        const userResponse = await fetch(`https://api.github.com/users/${username}`, {
          signal: controller.signal,
        });
        if (!userResponse.ok) {
          throw new Error("Failed to fetch GitHub user data");
        }

        const userJson = await userResponse.json();
        const repos: Array<{ language: string | null; stargazers_count: number }> = [];
        let page = 1;

        while (true) {
          const repoResponse = await fetch(
            `https://api.github.com/users/${username}/repos?per_page=100&page=${page}`,
            { signal: controller.signal }
          );

          if (!repoResponse.ok) {
            throw new Error("Failed to fetch GitHub repos");
          }

          const repoJson = await repoResponse.json();
          repos.push(...repoJson);
          if (repoJson.length < 100) {
            break;
          }
          page += 1;
        }

        const totalStars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
        const languageCount: Record<string, number> = {};
        repos.forEach((repo) => {
          if (repo.language) {
            languageCount[repo.language] = (languageCount[repo.language] || 0) + 1;
          }
        });

        const topLanguages = Object.entries(languageCount)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 6)
          .map(([name, count]) => ({ name, count }));

        if (active) {
          setGithubData({
            publicRepos: userJson.public_repos,
            followers: userJson.followers,
            following: userJson.following,
            totalStars,
            topLanguages,
          });
        }
      } catch (error) {
        if (active) {
          setGithubApiError(true);
        }
      }
    }

    fetchGithubData();

    return () => {
      active = false;
      controller.abort();
    };
  }, [username]);

  const imageTheme = theme === "light" ? "light" : "tokyonight";
  const statsImageUrl = `https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=${imageTheme}&hide_border=true`;
  const topLangImageUrl = `https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=${imageTheme}&hide_border=true`;
  const streakImageUrl = `https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=${imageTheme}&hide_border=true`;

  const renderFallbackStats = () => (
    <div className="w-full text-center">
      <div className="mb-4 text-xl font-semibold text-foreground">GitHub Stats</div>
      {githubData ? (
        <div className="space-y-3 text-left text-base text-foreground">
          <div>Public repos: <span className="font-semibold text-primary">{githubData.publicRepos}</span></div>
          <div>Followers: <span className="font-semibold text-primary">{githubData.followers}</span></div>
          <div>Following: <span className="font-semibold text-primary">{githubData.following}</span></div>
          <div>Total stars: <span className="font-semibold text-primary">{githubData.totalStars}</span></div>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          GitHub stats are temporarily unavailable. Please refresh later.
        </p>
      )}
    </div>
  );

  const renderFallbackTopLanguages = () => (
    <div className="w-full text-center">
      <div className="mb-4 text-xl font-semibold text-foreground">Top Languages</div>
      {githubData?.topLanguages?.length ? (
        <div className="space-y-3 text-left text-base text-foreground">
          {githubData.topLanguages.map((language) => (
            <div key={language.name}>
              <span className="font-semibold text-primary">{language.name}</span>: {language.count} repo{language.count > 1 ? "s" : ""}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          Top languages information is temporarily unavailable. Please refresh later.
        </p>
      )}
    </div>
  );

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">GitHub Activity</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            <div className="glass-panel p-6 flex flex-col items-center justify-center overflow-hidden hover:-translate-y-1 transition-transform min-h-[280px] bg-background/90 border border-border shadow-xl shadow-black/10 dark:shadow-white/10">
              {!statsImageError ? (
                <img
                  src={statsImageUrl}
                  alt="GitHub Stats"
                  loading="lazy"
                  className="w-full h-auto max-h-[260px] object-contain rounded-xl"
                  onError={() => setStatsImageError(true)}
                />
              ) : (
                renderFallbackStats()
              )}
            </div>

            <div className="grid gap-6">
              <div className="glass-panel p-6 flex flex-col items-center justify-center overflow-hidden hover:-translate-y-1 transition-transform min-h-[220px] bg-background/90 border border-border shadow-xl shadow-black/10 dark:shadow-white/10">
                {!langsImageError ? (
                  <img
                    src={topLangImageUrl}
                    alt="Top Languages"
                    loading="lazy"
                    className="w-full h-auto max-h-[220px] object-contain rounded-xl"
                    onError={() => setLangsImageError(true)}
                  />
                ) : (
                  renderFallbackTopLanguages()
                )}
              </div>
              <div className="glass-panel p-6 flex flex-col items-center justify-center overflow-hidden hover:-translate-y-1 transition-transform min-h-[220px] bg-background/90 border border-border shadow-xl shadow-black/10 dark:shadow-white/10">
                <img
                  src={streakImageUrl}
                  alt="GitHub Streak"
                  loading="lazy"
                  className="w-full h-auto max-h-[220px] object-contain rounded-xl"
                />
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button className="bg-[#2ea043] hover:bg-[#2c974b] text-white" asChild>
              <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" /> View GitHub Profile
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
