import { Icon } from '@iconify/react';

function Rating(props) {
  const { value } = props;
  return (
    <div className="flex">
      <span>
        {value >= 1 ? (
          <Icon icon="bxs:star" />
        ) : value > 0 ? (
          <Icon icon="bxs:star-half" />
        ) : (
          <Icon icon="bytesize:star" />
        )}
      </span>
      <span>
        {value >= 2 ? (
          <Icon icon="bxs:star" />
        ) : value > 1 ? (
          <Icon icon="bxs:star-half" />
        ) : (
          <Icon icon="bytesize:star" />
        )}
      </span>
      <span>
        {value >= 3 ? (
          <Icon icon="bxs:star" />
        ) : value > 2 ? (
          <Icon icon="bxs:star-half" />
        ) : (
          <Icon icon="bytesize:star" />
        )}
      </span>
      <span>
        {value >= 4 ? (
          <Icon icon="bxs:star" />
        ) : value > 3 ? (
          <Icon icon="bxs:star-half" />
        ) : (
          <Icon icon="bytesize:star" />
        )}
      </span>
      <span>
        {value >= 5 ? (
          <Icon icon="bxs:star" />
        ) : value > 4 ? (
          <Icon icon="bxs:star-half" />
        ) : (
          <Icon icon="bytesize:star" />
        )}
      </span>
    </div>
  );
}

export default Rating;
