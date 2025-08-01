"use client";
import GoogleAnalytics from "@/components/analytics/google-analytics";
import useKlaroConsent from "@/components/cookies/use-klaro-consent";

export default function GoogleAnalyticsProvider() {
    const hasConsent = useKlaroConsent("google-analytics");

    return hasConsent ? (
        <GoogleAnalytics/>
    ) : null;
}
