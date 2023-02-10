export interface IMessage {
  id: string;
  userId: string;
  fullname: string;
  avatar: string;
  content: string;
}

export interface IRoomInfo {
  id: string;
  categoryId: string;
  episodeId: string;
  hostId: string;
  movieId: string;
  title: string;
  thumbnail: string;
  currentTime: number;
  createdAt: number;
  messages: IMessage[];
}
