# Day.js Timezone Conversion Benchmark

A comprehensive performance benchmark tool for evaluating Day.js timezone conversion operations. This project measures and compares the efficiency of converting UTC timestamps to various timezones using Day.js with the timezone plugin.

## 🎯 Purpose

This benchmark helps developers understand the performance characteristics of Day.js timezone operations, which is crucial for applications that handle multiple timezones or require high-frequency time conversions.

## ✨ Features

- **Performance Testing**: Measures execution time for timezone conversions
- **Multiple Timezone Support**: Tests against various timezone scenarios
- **Statistical Analysis**: Provides detailed performance metrics
- **Easy Setup**: Simple installation and execution process
- **Configurable**: Customizable benchmark parameters

## 🔧 Tech Stack

- **Runtime**: Node.js v22.14.0+
- **Timezone Library**: Day.js v1.11.x with timezone plugin
- **Testing Framework**: Built-in Node.js performance measurement
- **Platform**: Cross-platform (tested on macOS, Linux, Windows)

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/devendrafyle/timezone-benchmark.git
   cd timezone-benchmark
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Day.js (if not already installed):**
   ```bash
   npm install dayjs
   ```

## 🚀 Usage

### Command Line Options

The benchmark supports two modes with various options:

```bash
# Show help
node benchmark.js --help

# Run advanced benchmark (default - comprehensive output)
node benchmark.js
node benchmark.js --advanced

# Run basic benchmark (simple output like original)
node benchmark.js --basic
node benchmark.js -b

# Basic benchmark with custom timezone
node benchmark.js --basic --timezone UTC
node benchmark.js -b -t America/New_York
```

### Basic Benchmark Mode

Simple output format similar to the original benchmark:

```bash
node benchmark.js --basic
```

**Output:**
```
🔄 Running Basic Benchmark for Asia/Kolkata...

List Size: 10 | Avg Time: 1.35 ms | Per-Item: 0.14 ms
List Size: 100 | Avg Time: 3.98 ms | Per-Item: 0.04 ms
List Size: 1000 | Avg Time: 36.85 ms | Per-Item: 0.04 ms

✅ Basic benchmark completed!
```

### Advanced Benchmark Mode

Comprehensive benchmarking with detailed statistics:

```bash
node benchmark.js --advanced
```

**Features:**
- Multiple timezone testing
- Detailed performance metrics
- Memory usage tracking
- Statistical analysis
- Performance summary

## 📊 Benchmark Results

The benchmark provides detailed metrics including:
- **Execution Time**: Average, minimum, and maximum conversion times
- **Memory Usage**: Heap usage during operations
- **Throughput**: Conversions per second
- **Statistical Analysis**: Standard deviation and percentiles

### Example Output

```
Day.js Timezone Conversion Benchmark
====================================

Converting 10000 timestamps to America/New_York:
- Average time: 0.045ms
- Min time: 0.032ms
- Max time: 0.089ms
- Total time: 450.23ms
- Throughput: 22,222 conversions/sec
```

## 🔍 What Gets Tested

- UTC to timezone conversion performance
- Memory allocation patterns
- CPU usage during operations
- Scalability with different data sizes
- Timezone plugin overhead

## 📈 Performance Considerations

- **First Run**: Initial conversions may be slower due to JIT compilation
- **Memory**: Large datasets may impact performance
- **Timezone Complexity**: Some timezones have more complex rules
- **Platform Differences**: Performance may vary across operating systems

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Contribution Guidelines

- Ensure all tests pass
- Add appropriate documentation
- Follow existing code style
- Include performance impact analysis for new features

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Day.js](https://day.js.org/) team for the excellent timezone library
- Node.js community for performance measurement tools
- Contributors and users who provide feedback

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/devendrafyle/timezone-benchmark/issues)
- **Discussions**: [GitHub Discussions](https://github.com/devendrafyle/timezone-benchmark/discussions)
- **Wiki**: [Project Wiki](https://github.com/devendrafyle/timezone-benchmark/wiki)

## 🔄 Version History

- **v1.0.0** - Initial benchmark implementation
- **v1.1.0** - Added statistical analysis and multiple timezone support
- **v1.2.0** - Performance optimizations and enhanced metrics

---

**Note**: This benchmark is designed for development and testing purposes. Always test performance in your specific use case and environment.
