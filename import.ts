import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

// 1. 定义类型
interface Video {
  title: string;
  description: string;
  sources: string[];
  thumb: string;
}

// 2. 定义模型（明确指定集合名为 'Movie'）
const movieSchema = new mongoose.Schema({
  title: String,
  description: String,
  videoUrl: String,
  thumbnailUrl: String,
  genre: String,
  duration: String
});

// 重点修改：第三个参数强制指定集合名
const Movie = mongoose.model('Movie', movieSchema, 'Movie');

// 3. 主函数
async function importMovies() {
  try {
    // 连接数据库（确认使用 test 数据库）
    const conn = await mongoose.connect('mongodb://127.0.0.1:27017/test');
    console.log('MongoDB 连接成功（数据库：test）');

    // 读取数据
    const filePath = path.join(process.cwd(), 'media.json');
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const { categories } = JSON.parse(rawData);

    // 处理数据
    const movies = categories
      .find((cat: any) => cat.name === 'Movies')?.videos
      .map((video: Video) => ({
        title: video.title,
        description: video.description,
        videoUrl: video.sources[0],
        thumbnailUrl: video.thumb,
        genre: 'General',
        duration: 'Unknown'
      })) || [];

    // 插入数据（将存入 'Movie' 集合）
    await Movie.insertMany(movies);
    console.log(`成功导入 ${movies.length} 条数据到 Movie 集合`);

  } catch (err) {
    console.error('导入失败:', err);
  } finally {
    await mongoose.disconnect();
  }
}

// 执行
importMovies();