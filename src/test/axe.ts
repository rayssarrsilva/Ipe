import axe from 'axe-core';

/**
 * Runs axe-core against a rendered component. Color contrast needs a real browser and
 * `region` is a whole-page rule, so both are checked in Storybook instead.
 */
export async function axeViolations(container: Element) {
  const results = await axe.run(container, {
    rules: {
      'color-contrast': { enabled: false },
      region: { enabled: false },
    },
  });
  return results.violations.map((v) => `${v.id}: ${v.help}`);
}
