import React, { useCallback } from 'react';
import classNames from 'classnames';

const INITIAL_LIKES = 100;
const INITIAL_DISLIKES = 25;

/**
 * LikeDislike 元件 - 新聞文章用的讚/不讚按鈕元件
 * 
 * 功能說明：
 * - Like 按鈕：初始 100 個讚，可切換按讚狀態
 * - Dislike 按鈕：初始 25 個不讚，可切換不讚狀態
 * - 兩個按鈕互斥：點擊其中一個會取消另一個的狀態
 */
function LikeDislike(): JSX.Element {
  const [likes, setLikes] = React.useState<number>(INITIAL_LIKES);
  const [dislikes, setDislikes] = React.useState<number>(INITIAL_DISLIKES);
  const [liked, setLiked] = React.useState<boolean>(false);
  const [disliked, setDisliked] = React.useState<boolean>(false);

  /**
   * 切換 Like 狀態：切換當前狀態，並取消對立的 Dislike（如果存在）
   */
  const handleLike = useCallback((): void => {
    const willBeLiked = !liked;
    
    setLiked(willBeLiked);
    setLikes((prev) => prev + (willBeLiked ? 1 : -1));
    
    // 啟用 Like 時，若 Dislike 已啟用則取消它
    if (willBeLiked && disliked) {
      setDisliked(false);
      setDislikes((prev) => prev - 1);
    }
  }, [liked, disliked]);

  /**
   * 切換 Dislike 狀態：切換當前狀態，並取消對立的 Like（如果存在）
   */
  const handleDislike = useCallback((): void => {
    const willBeDisliked = !disliked;
    
    setDisliked(willBeDisliked);
    setDislikes((prev) => prev + (willBeDisliked ? 1 : -1));
    
    // 啟用 Dislike 時，若 Like 已啟用則取消它
    if (willBeDisliked && liked) {
      setLiked(false);
      setLikes((prev) => prev - 1);
    }
  }, [liked, disliked]);

  return (
    <>
      <button
        type="button"
        className={classNames('like-button', { liked })}
        onClick={handleLike}
      >
        Like | <span className="likes-counter">{likes}</span>
      </button>
      <button
        type="button"
        className={classNames('dislike-button', { disliked })}
        onClick={handleDislike}
      >
        Dislike | <span className="dislikes-counter">{dislikes}</span>
      </button>
    </>
  );
}

export default LikeDislike;

