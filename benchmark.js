#!/usr/bin/env node

/**
 * Day.js Timezone Conversion Benchmark
 * 
 * This benchmark evaluates the performance of converting UTC timestamps to various
 * timezones using Day.js with the timezone plugin. It provides comprehensive
 * performance metrics including execution time, memory usage, and throughput.
 * 
 * @author devendrafyle
 * @version 1.0.0
 */

const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const { performance } = require('perf_hooks');

// Extend dayjs with timezone functionality
dayjs.extend(utc);
dayjs.extend(timezone);

// Configuration
const CONFIG = {
  listSizes: [10, 100, 1000, 10000],
  iterations: 30,
  timezones: [
    'Asia/Kolkata',
    'America/New_York',
    'Europe/London',
    'Asia/Tokyo',
    'Australia/Sydney',
    'UTC'
  ],
  warmupRuns: 5,
  outputFormat: 'YYYY-MM-DD HH:mm:ss Z'
};

function parseArguments() {
  const args = process.argv.slice(2);
  const options = {
    mode: 'advanced',
    timezone: 'Asia/Kolkata',
    help: false
  };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--basic':
      case '-b':
        options.mode = 'basic';
        break;
      case '--advanced':
      case '-a':
        options.mode = 'advanced';
        break;
      case '--timezone':
      case '-t':
        if (i + 1 < args.length) {
          options.timezone = args[++i];
        }
        break;
      case '--help':
      case '-h':
        options.help = true;
        break;
    }
  }

  return options;
}

function showHelp() {
  console.log(`
🚀 Day.js Timezone Conversion Benchmark

Usage: node benchmark.js [options]

Options:
  -b, --basic              Run basic benchmark (simple output)
  -a, --advanced           Run advanced benchmark (detailed output) [default]
  -t, --timezone <tz>      Specify timezone for basic mode (default: Asia/Kolkata)
  -h, --help               Show this help message

Examples:
  node benchmark.js                    # Run advanced benchmark
  node benchmark.js --basic           # Run basic benchmark
  node benchmark.js -b -t UTC         # Basic benchmark with UTC timezone
  node benchmark.js --advanced        # Explicitly run advanced benchmark

Basic Mode: Simple output like the original benchmark
Advanced Mode: Comprehensive statistics, multiple timezones, memory tracking
`);
}

function generateTimestamps(size) {
  const now = new Date();
  return Array.from({ length: size }, (_, i) => {
    const date = new Date(now.getTime() + (i * 24 * 60 * 60 * 1000));
    return date.toISOString();
  });
}

function calculateStats(times) {
  const sorted = times.sort((a, b) => a - b);
  const sum = times.reduce((a, b) => a + b, 0);
  const mean = sum / times.length;
  const variance = times.reduce((acc, time) => acc + Math.pow(time - mean, 2), 0) / times.length;
  const stdDev = Math.sqrt(variance);
  
  return {
    count: times.length,
    mean: mean,
    min: sorted[0],
    max: sorted[sorted.length - 1],
    median: sorted[Math.floor(sorted.length / 2)],
    stdDev: stdDev,
    p95: sorted[Math.floor(sorted.length * 0.95)],
    p99: sorted[Math.floor(sorted.length * 0.99)]
  };
}

function formatTime(ms) {
  if (ms < 1) return `${(ms * 1000).toFixed(2)} μs`;
  if (ms < 1000) return `${ms.toFixed(2)} ms`;
  return `${(ms / 1000).toFixed(2)} s`;
}

function formatThroughput(count, timeMs) {
  const perSecond = (count / timeMs) * 1000;
  if (perSecond >= 1000000) return `${(perSecond / 1000000).toFixed(2)}M ops/sec`;
  if (perSecond >= 1000) return `${(perSecond / 1000).toFixed(2)}K ops/sec`;
  return `${perSecond.toFixed(2)} ops/sec`;
}

function getMemoryUsage() {
  const usage = process.memoryUsage();
  return {
    rss: Math.round(usage.rss / 1024 / 1024),
    heapUsed: Math.round(usage.heapUsed / 1024 / 1024),
    heapTotal: Math.round(usage.heapTotal / 1024 / 1024)
  };
}

function runBenchmark(timezone, timestamps, iterations) {
  const times = [];
  const memoryBefore = getMemoryUsage();
  
  // Warmup runs
  for (let i = 0; i < CONFIG.warmupRuns; i++) {
    timestamps.map(ts => dayjs.utc(ts).tz(timezone).format(CONFIG.outputFormat));
  }
  
  for (let i = 0; i < iterations; i++) {
    const start = performance.now();
    timestamps.map(ts => dayjs.utc(ts).tz(timezone).format(CONFIG.outputFormat));
    const end = performance.now();
    times.push(end - start);
  }
  
  const memoryAfter = getMemoryUsage();
  const stats = calculateStats(times);
  
  return {
    stats,
    memoryDelta: {
      rss: memoryAfter.rss - memoryBefore.rss,
      heapUsed: memoryAfter.heapUsed - memoryBefore.heapUsed,
      heapTotal: memoryAfter.heapTotal - memoryBefore.heapTotal
    }
  };
}

// Basic benchmark function
function runBasicBenchmark(timezone) {
  console.log(`\n🔄 Running Basic Benchmark for ${timezone}...\n`);
  
  const listSizes = [10, 100, 1000];
  const iterations = 30;
  
  listSizes.forEach((size) => {
    const timestamps = Array.from({ length: size }, () => new Date().toISOString());
    
    const times = [];
    for (let i = 0; i < iterations; i++) {
      const start = performance.now();
      timestamps.map((ts) => dayjs.utc(ts).tz(timezone).format('YYYY-MM-DD HH:mm'));
      const end = performance.now();
      times.push(end - start);
    }
    
    const avg = times.reduce((a, b) => a + b, 0) / iterations;
    const perItem = avg / size;
    console.log(`List Size: ${size} | Avg Time: ${avg.toFixed(2)} ms | Per-Item: ${perItem.toFixed(2)} ms`);
  });
  
  console.log('\n✅ Basic benchmark completed!\n');
}

function printHeader() {
  console.log('\n' + '='.repeat(80));
  console.log('🚀 Day.js Timezone Conversion Benchmark (Advanced Mode)');
  console.log('='.repeat(80));
  console.log(`📅 Date: ${new Date().toLocaleDateString()}`);
  console.log(`⏰ Time: ${new Date().toLocaleTimeString()}`);
  console.log(`🖥️  Platform: ${process.platform} ${process.arch}`);
  console.log(`📦 Node.js: ${process.version}`);
  console.log(`🔧 Day.js: ${dayjs.version}`);
  console.log(`🌍 Timezones: ${CONFIG.timezones.length}`);
  console.log(`📊 Iterations: ${CONFIG.iterations}`);
  console.log(`🔥 Warmup Runs: ${CONFIG.warmupRuns}`);
  console.log('='.repeat(80) + '\n');
}

function printResults(timezone, size, results) {
  const { stats, memoryDelta } = results;
  
  console.log(`📍 Timezone: ${timezone}`);
  console.log(`📏 List Size: ${size.toLocaleString()}`);
  console.log(`⏱️  Performance:`);
  console.log(`   • Average: ${formatTime(stats.mean)}`);
  console.log(`   • Median: ${formatTime(stats.median)}`);
  console.log(`   • Min: ${formatTime(stats.min)}`);
  console.log(`   • Max: ${formatTime(stats.max)}`);
  console.log(`   • Std Dev: ${formatTime(stats.stdDev)}`);
  console.log(`   • 95th Percentile: ${formatTime(stats.p95)}`);
  console.log(`   • 99th Percentile: ${formatTime(stats.p99)}`);
  console.log(`   • Throughput: ${formatThroughput(size, stats.mean)}`);
  
  if (Math.abs(memoryDelta.heapUsed) > 0) {
    console.log(`💾 Memory Usage:`);
    console.log(`   • Heap Used: ${memoryDelta.heapUsed > 0 ? '+' : ''}${memoryDelta.heapUsed} MB`);
    console.log(`   • RSS: ${memoryDelta.rss > 0 ? '+' : ''}${memoryDelta.rss} MB`);
  }
  
  console.log('-'.repeat(60));
}

function printSummary(allResults) {
  console.log('\n📊 SUMMARY');
  console.log('='.repeat(60));
  
  const summary = {};
  
  allResults.forEach(({ timezone, size, results }) => {
    if (!summary[size]) summary[size] = [];
    summary[size].push({
      timezone,
      avgTime: results.stats.mean,
      throughput: (size / results.stats.mean) * 1000
    });
  });
  
  Object.entries(summary).forEach(([size, data]) => {
    console.log(`\n📏 List Size: ${parseInt(size).toLocaleString()}`);
    data.sort((a, b) => b.throughput - a.throughput);
    
    data.forEach(({ timezone, avgTime, throughput }) => {
      console.log(`   ${timezone.padEnd(20)} | ${formatTime(avgTime).padEnd(10)} | ${formatThroughput(parseInt(size), avgTime)}`);
    });
  });
  
  console.log('\n' + '='.repeat(60));
  console.log('✨ Advanced benchmark completed successfully!');
  console.log('💡 Tip: Run multiple times to get more accurate results');
  console.log('🔗 GitHub: https://github.com/devendrafyle/timezone-benchmark');
  console.log('='.repeat(60) + '\n');
}

// Advanced benchmark function (comprehensive output)
async function runAdvancedBenchmark() {
  try {
    printHeader();
    
    const allResults = [];
    
    for (const timezone of CONFIG.timezones) {
      for (const size of CONFIG.listSizes) {
        const timestamps = generateTimestamps(size);
        const results = runBenchmark(timezone, timestamps, CONFIG.iterations);
        
        printResults(timezone, size, results);
        allResults.push({ timezone, size, results });
        
        // Small delay between tests to avoid overwhelming the system
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
    
    printSummary(allResults);
    
  } catch (error) {
    console.error('❌ Advanced benchmark failed:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

async function main() {
  const options = parseArguments();
  
  if (options.help) {
    showHelp();
    return;
  }
  
  try {
    if (options.mode === 'basic') {
      runBasicBenchmark(options.timezone);
    } else {
      await runAdvancedBenchmark();
    }
  } catch (error) {
    console.error('❌ Benchmark failed:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

process.on('SIGINT', () => {
  console.log('\n\n🛑 Benchmark interrupted by user');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n\n🛑 Benchmark terminated');
  process.exit(0);
});

if (require.main === module) {
  main();
}

module.exports = {
  runBenchmark,
  runBasicBenchmark,
  runAdvancedBenchmark,
  calculateStats,
  formatTime,
  formatThroughput,
  getMemoryUsage
};
