import React, { FC } from 'react';

import { IconCopy } from 'src/icons';

function copyToClipboardLegacy(text: string) {
  if (!document) return;
  const textArea = document.createElement('textarea');
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.position = 'fixed';

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  let result: boolean;
  try {
    result = document.execCommand('copy');
  } catch (err) {
    console.error(err);
    result = false;
  }

  document.body.removeChild(textArea);
  return result;
}

async function handleCopy(value: string) {
  if (!document) return;

  if (!navigator || !navigator.clipboard) {
    return copyToClipboardLegacy(value);
  }

  let result;
  await navigator.clipboard.writeText(value).then(
    () => {
      result = true;
    },
    (err) => {
      console.error(err);
      result = false;
    },
  );
  return result;
}

const ContactLink: FC<{ className?: string; type: 'email' | 'phone'; value: string }> = (props) => {
  let href: string | undefined;
  switch (props.type) {
    case 'email':
      href = `mailto:${props.value}`;
      break;
    case 'phone':
      href = `call:${props.value}`;
      break;
    default:
      throw new Error(`ContactLink: Unknown type ${props.type}`);
  }
  const Component = href ? 'a' : 'span';

  return (
    <div
      className={[
        props.className ||
          'border tic-border rounded bg-stone-300 dark:bg-gray-800 font-mono text-xs',
        'rounded',
        'flex',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <Component href={href} className="px-2 py-1">
        {props.value}
      </Component>
      <button
        className={['flex items-center px-2 tic-border border-l', 'active:text-blue-500'].join(' ')}
        type="button"
        onClick={() => handleCopy(props.value)}
      >
        <span className="w-4 h-4">
          <IconCopy />
        </span>
      </button>
    </div>
  );
};

export default ContactLink;
