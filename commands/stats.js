const logger = require('../logger');
const os = require('os');
const process = require('process');
const axios = require('axios');
const crypto = require('crypto');
const fs = require('fs').promises;
const path = require('path');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

module.exports = {
  name: 'stats',
  description: 'Display Nexus status',
  async execute(message, args) {
    try {
      const startTime = process.uptime();
      const uptimeString = formatUptime(startTime);
      const option = args[0]?.toLowerCase() || 'all';
      const theme = args[1]?.toLowerCase() || 'default';
      
      let responseMessage = "";
      const themeColors = getThemeColors(theme);

      switch (option) {
        case 'basic':
          responseMessage = `${themeColors.highlight} Bot Uptime: ${themeColors.text} ${uptimeString}\n`;
          break;
        case 'system':
          responseMessage = await getSystemInfo(themeColors);
          break;
        case 'all':
          responseMessage = `${themeColors.highlight} Bot Uptime: ${themeColors.text} ${uptimeString}\n\n` +
            `${await getSystemInfo(themeColors)}\n\n` +
            `${await getAdditionalInfo(themeColors)}`;
          break;
        default:
          responseMessage = "Invalid option. Use 'basic', 'system', or 'all'.";
      }

      await message.reply(responseMessage);
      logger.info(`Uptime command executed by ${message.author.tag} with option: ${option}`);
    } catch (error) {
      logger.error(`Error in uptime command: ${error}`);
      await message.reply("An error occurred while processing the request.");
      throw error;
    }
  },
};


function formatUptime(seconds) {
  const days = Math.floor(seconds / (3600 * 24));
  const hours = Math.floor((seconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  return `${days}d ${hours}h ${minutes}m ${secs}s`;
}

async function getSystemInfo(colors) {
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMem = totalMem - freeMem;
  const cpuUsage = await getCPUUsage();
  const diskSpace = await getDiskSpace();
  return `${colors.highlight} System Information: ${colors.text}\n` +
    `Platform: ${os.platform()}\n` +
    `OS: ${os.type()} ${os.release()}\n` +
    `Memory: ${formatBytes(usedMem)}/${formatBytes(totalMem)} (${(usedMem / totalMem * 100).toFixed(2)}%)\n` +
    `Disk: ${formatBytes(diskSpace.used)}/${formatBytes(diskSpace.total)} (${diskSpace.usedPercentage}%)\n` +
    `CPU: ${cpuUsage.toFixed(2)}% | ${os.cpus().length} cores\n` +
    `Temp: ${await getCPUTemperature()}°C`;
}

async function getAdditionalInfo(colors) {
  try {
    const { data } = await axios.get('https://api.ipify.org?format=json');
    const weatherData = await getWeatherData(data.ip);
    const quote = await getRandomQuote();
    return `${colors.highlight} Additional Info: ${colors.text}\n` +
      `Weather: ${weatherData.temp}°C, ${weatherData.description} in ${weatherData.city}\n` +
      `Quote: "${quote.content}" - ${quote.author}\n` +
      `Public IP: ${data.ip}`;
  } catch (error) {
    console.error("Error fetching additional info:", error);
    return `${colors.highlight} Additional Info: ${colors.text} Unable to fetch.`;
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

async function getCPUUsage() {
  const startMeasure = cpuAverage();
  await new Promise(resolve => setTimeout(resolve, 100));
  const endMeasure = cpuAverage();
  const idleDifference = endMeasure.idle - startMeasure.idle;
  const totalDifference = endMeasure.total - startMeasure.total;
  return 100 - ~~(100 * idleDifference / totalDifference);
}

function cpuAverage() {
  const cpus = os.cpus();
  let totalIdle = 0, totalTick = 0;
  for (const cpu of cpus) {
    for (const type in cpu.times) {
      totalTick += cpu.times[type];
    }
    totalIdle += cpu.times.idle;
  }
  return { idle: totalIdle / cpus.length, total: totalTick / cpus.length };
}

async function getCPUTemperature() {
  if (os.platform() !== 'linux') return 'N/A';
  try {
    const temp = await fs.readFile('/sys/class/thermal/thermal_zone0/temp', 'utf8');
    return (parseInt(temp) / 1000).toFixed(1);
  } catch (error) {
    console.error("Error getting CPU temperature:", error);
    return 'N/A';
  }
}

async function getDiskSpace() {
  try {
    if (os.platform() === 'win32') {
      const { stdout } = await exec('wmic logicaldisk get size,freespace,caption');
      const lines = stdout.trim().split('\n').slice(1);
      const total = lines.reduce((acc, line) => acc + parseInt(line.trim().split(/\s+/)[1]), 0);
      const free = lines.reduce((acc, line) => acc + parseInt(line.trim().split(/\s+/)[2]), 0);
      const used = total - free;
      return { total, used, free, usedPercentage: ((used / total) * 100).toFixed(2) };
    } else {
      const { stdout } = await exec('df -k / | tail -1');
      const [, total, used, free] = stdout.trim().split(/\s+/);
      return { total: parseInt(total) * 1024, used: parseInt(used) * 1024, free: parseInt(free) * 1024, usedPercentage: ((parseInt(used) / parseInt(total)) * 100).toFixed(2) };
    }
  } catch (error) {
    console.error("Error getting disk space:", error);
    return { total: 0, used: 0, free: 0, usedPercentage: '0' };
  }
}

async function getWeatherData(ip) {
  try {
    const geoResponse = await axios.get(`http://ip-api.com/json/${ip}`);
    const { lat, lon, city } = geoResponse.data;
    const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a9b4c37c68380d91903251d40ffa89ec&units=metric`);
    const { main, weather } = weatherResponse.data;
    return { temp: main.temp, description: weather[0].description, city: city };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return { temp: "N/A", description: "N/A", city: "N/A" };
  }
}

async function getRandomQuote() {
  try {
    const { data } = await axios.get('https://api.quotable.io/random');
    return { content: data.content, author: data.author };
  } catch (error) {
    console.error("Error fetching random quote:", error);
    return { content: "Unable to fetch quote", author: "Unknown" };
  }
}

function getThemeColors(theme) {
  const themes = {
    default: { highlight: '', subheading: '', text: '' },
    dark: { highlight: '', subheading: '', text: '' },
    light: { highlight: '', subheading: '', text: '' },
    custom: { highlight: '', subheading: '', text: '' }
  };
  return themes[theme] || themes.default;
}

async function logCommand(userId, option) {
  const date = new Date().toISOString().split('T')[0];
  const logPath = path.join(__dirname, '..', 'logs', `${date}.log`);
  const logEntry = `${new Date().toISOString()} uptime ${option} ${userId}\n`;
  try {
    await fs.appendFile(logPath, logEntry);
  } catch (error) {
    console.error("Error logging command:", error);
  }
}