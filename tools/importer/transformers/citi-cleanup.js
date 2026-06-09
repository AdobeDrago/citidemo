/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Citi site-wide cleanup.
 * Removes non-authorable content (header, footer, navigation, cookie consent,
 * feedback widgets, tracking iframes, session handlers).
 * All selectors verified from captured DOM in migration-work/cleaned.html.
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove cookie consent banner and modal (blocks parsing due to overlay)
    // Found in captured HTML: <div id="ensNotifyBanner" class="ensNotifyBanner">
    // Found in captured HTML: <section id="ensConsentWidget" class="consentWidget">
    // Found in captured HTML: <dialog id="ensModalWrapper">
    WebImporter.DOMUtils.remove(element, [
      '#ensNotifyBanner',
      '#ensConsentWidget',
      '#ensModalWrapper',
    ]);

    // Remove Qualtrics feedback widget (overlay)
    // Found in captured HTML: <div class="QSIFeedbackButton">
    WebImporter.DOMUtils.remove(element, ['.QSIFeedbackButton']);

    // Remove popup component (overlay)
    // Found in captured HTML: <app-popup class="ng-star-inserted">
    WebImporter.DOMUtils.remove(element, ['app-popup']);
  }

  if (hookName === TransformHook.afterTransform) {
    // Remove site header (non-authorable global chrome)
    // Found in captured HTML: <citi-header class="ng-tns-c3920221554-0">
    WebImporter.DOMUtils.remove(element, ['citi-header']);

    // Remove site footer (non-authorable global chrome)
    // Found in captured HTML: <citi-footer class="ng-tns-c3920221554-0">
    WebImporter.DOMUtils.remove(element, ['citi-footer']);

    // Remove accessibility helper and skip nav (non-authorable)
    // Found in captured HTML: <p id="a11y-message--new-window" class="hidden">
    // Found in captured HTML: <a class="alternateSkipNav" href="">
    WebImporter.DOMUtils.remove(element, ['#a11y-message--new-window', '.alternateSkipNav']);

    // Remove Angular session/routing components (non-authorable)
    // Found in captured HTML: <cbol-session>, <citi-route-detector>, <citi-session-handler>
    WebImporter.DOMUtils.remove(element, ['cbol-session', 'citi-route-detector', 'citi-session-handler']);

    // Remove Angular CDK live announcer (non-authorable)
    // Found in captured HTML: <div class="cdk-live-announcer-element cdk-visually-hidden" id="cdk-live-announcer-0">
    WebImporter.DOMUtils.remove(element, ['#cdk-live-announcer-0']);

    // Remove tracking/survey placeholders (non-authorable)
    // Found in captured HTML: <div id="ZN_3VI8kkudS0JJRFc">
    WebImporter.DOMUtils.remove(element, ['[id^="ZN_"]']);

    // Remove iframes (tracking pixels, Adobe ID sync)
    // Found in captured HTML: <iframe title="Adobe ID Syncing iFrame"...>
    // Found in captured HTML: <iframe src="//sr.rlcdn.com/...">
    WebImporter.DOMUtils.remove(element, ['iframe']);

    // Remove router-outlet elements (Angular scaffolding, non-authorable)
    // Found in captured HTML: <router-outlet class="ng-tns-c3920221554-0">
    WebImporter.DOMUtils.remove(element, ['router-outlet']);
  }
}
