export const SocialItem = ({ path, iconClass }) => {
  return (
    <li>
      <a href={path}>
        <i className={iconClass} aria-hidden="true"></i>
      </a>
    </li>
  );
};

